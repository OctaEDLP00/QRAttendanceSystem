// frontend/src/services/api.ts - API client service using FormData
import type {
  ApiResponse,
  Attendance,
  AuthToken,
  Course,
  Institution,
  LoginResponse,
  QRSession,
  User
} from '~/types';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Convert object to FormData for API requests
 */
function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    }
  });

  return formData;
}

class ApiClient {
  private baseUrl: string;
  private isClient: boolean;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.isClient = typeof window !== 'undefined';
  }

  private getHeaders(includeAuth = true): Record<string, string> {
    const headers: Record<string, string> = {};

    if (includeAuth) {
      const token = this.getAccessToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private getAccessToken(): string | null {
    if (this.isClient && typeof localStorage !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  private setTokens(tokens: AuthToken): void {
    if (this.isClient && typeof localStorage !== 'undefined') {
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      localStorage.setItem('tokenExpiry', (Date.now() + tokens.expiresIn * 1000).toString());
    }
  }

  private clearTokens(): void {
    if (this.isClient && typeof localStorage !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('tokenExpiry');
    }
  }

  async request<T>(
    endpoint: string,
    options: Omit<RequestInit, 'body'> & { body?: FormData | Record<string, any> } = {},
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;

      // Convert body to FormData if it's an object
      let body: FormData | undefined = undefined;
      if (options.body) {
        if (options.body instanceof FormData) {
          body = options.body;
        } else if (typeof options.body === 'object') {
          body = objectToFormData(options.body);
        }
      }

      const headers = this.getHeaders(options.method !== 'GET');
      const isFormData = body instanceof FormData;

      const fetchOptions: RequestInit = {
        ...Object.fromEntries(Object.entries(options).filter(([key]) => key !== 'body')),
        headers: {
          ...headers,
          ...(!isFormData && { 'Accept': 'application/json' }),
          ...options.headers,
        },
      };

      // Only add body if it exists
      if (body) {
        fetchOptions.body = body;
      }

      const response = await fetch(url, fetchOptions);

      const contentType = response.headers.get('content-type');
      let data: T | null = null;

      if (contentType?.includes('application/json')) {
        data = await response.json();
      }

      if (!response.ok) {
        const errorMessage = data ? (data as any).message || 'Request failed' : response.statusText;
        return {
          success: false,
          error: {
            status: response.status,
            message: errorMessage,
          },
        };
      }

      return {
        success: true,
        data: data || ({} as T),
        status: response.status,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      return {
        success: false,
        error: {
          status: 0,
          message: errorMessage,
        },
      };
    }
  }

  // Auth endpoints
  async login(payload: FormData | { email: string; password: string }): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: payload,
    });

    // Store tokens and user data on successful login
    if (response.success && response.data) {
      if (response.data.tokens) {
        this.setTokens(response.data.tokens);
      }
      if (response.data.user && this.isClient && typeof localStorage !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }

    return response;
  }

  async logout(): Promise<ApiResponse<{ success: boolean }>> {
    const response = await this.request<{ success: boolean }>('/auth/logout', {
      method: 'POST',
    });

    if (response.success) {
      this.clearTokens();
    }

    return response;
  }

  async refreshToken(): Promise<ApiResponse<AuthToken>> {
    const refreshToken = this.isClient && typeof localStorage !== 'undefined'
      ? localStorage.getItem('refreshToken')
      : null;

    if (!refreshToken) {
      return {
        success: false,
        error: {
          status: 401,
          message: 'No refresh token available',
        },
      };
    }

    const response = await this.request<AuthToken>('/auth/refresh', {
      method: 'POST',
      body: { refreshToken },
    });

    if (response.success && response.data) {
      this.setTokens(response.data);
    }

    return response;
  }

  // User endpoints
  async getUserProfile(userId: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${userId}`);
  }

  async getUserInstitutions(userId: string): Promise<ApiResponse<string[]>> {
    return this.request<string[]>(`/users/${userId}/institutions`);
  }

  async getUserCourses(userId: string): Promise<ApiResponse<Course[]>> {
    return this.request<Course[]>(`/users/${userId}/courses`);
  }

  // Course endpoints
  async getCoursesByTeacher(teacherId: string): Promise<ApiResponse<Course[]>> {
    return this.request<Course[]>(`/courses/teacher/${teacherId}`);
  }

  async getCourse(courseId: string): Promise<ApiResponse<Course>> {
    return this.request<Course>(`/courses/${courseId}`);
  }

  // Institutions endpoints
  async getInstitutionsByTeacher(teacherId: string): Promise<ApiResponse<Institution[]>> {
    return this.request<Institution[]>(`/institutions/teacher/${teacherId}`);
  }

  async getInstitution(institutionId: string): Promise<ApiResponse<Institution>> {
    return this.request<Institution>(`/institutions/${institutionId}`);
  }

  // QR endpoints
  async createStudentQR(studentId: string, courseId: string): Promise<ApiResponse<QRSession>> {
    return this.request<QRSession>(`/qr/student/${studentId}/course/${courseId}`, {
      method: 'POST',
    });
  }

  async getActiveQR(courseId: string): Promise<ApiResponse<QRSession>> {
    return this.request<QRSession>(`/qr/session/${courseId}`);
  }

  // Attendance endpoints
  async registerAttendance(
    studentId: string,
    courseId: string,
    latitude: number,
    longitude: number,
  ): Promise<ApiResponse<Attendance>> {
    return this.request<Attendance>('/attendance/register', {
      method: 'POST',
      body: { studentId, courseId, latitude, longitude },
    });
  }

  async scanAttendance(
    qrToken: string,
    courseId: string,
    latitude: number,
    longitude: number,
  ): Promise<ApiResponse<Attendance>> {
    return this.request<Attendance>('/attendance/scan', {
      method: 'POST',
      body: { qrToken, courseId, latitude, longitude },
    });
  }

  async getCourseAttendance(courseId: string): Promise<ApiResponse<Attendance[]>> {
    return this.request<Attendance[]>(`/attendance/course/${courseId}`);
  }

  async getStudentAttendance(studentId: string): Promise<ApiResponse<Attendance[]>> {
    return this.request<Attendance[]>(`/attendance/student/${studentId}`);
  }
}

export const apiClient = new ApiClient();
