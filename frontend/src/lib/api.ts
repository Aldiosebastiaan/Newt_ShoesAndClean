// API utility functions for backend communication

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || "Login failed" };
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return { data };
    } catch (error) {
      return { error: "Network error. Please try again." };
    }
  },

  register: async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || "Registration failed" };
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return { data };
    } catch (error) {
      return { error: "Network error. Please try again." };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  },

  getUser: () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    return !!authApi.getToken();
  },
};

// Booking API
export const bookingApi = {
  create: async (bookingData: {
    service: string;
    shoe_type: string;
    pickup_address: string;
    pickup_date: string;
    pickup_time: string;
    notes?: string;
  }): Promise<ApiResponse> => {
    try {
      const token = authApi.getToken();
      if (!token) {
        return { error: "Please login first" };
      }

      const response = await fetch(`${API_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || "Booking failed" };
      }

      return { data };
    } catch (error) {
      return { error: "Network error. Please try again." };
    }
  },

  getAll: async (): Promise<ApiResponse> => {
    try {
      const token = authApi.getToken();
      if (!token) {
        return { error: "Please login first" };
      }

      const response = await fetch(`${API_URL}/booking`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || "Failed to fetch bookings" };
      }

      return { data };
    } catch (error) {
      return { error: "Network error. Please try again." };
    }
  },

  getById: async (id: string): Promise<ApiResponse> => {
    try {
      const token = authApi.getToken();
      if (!token) {
        return { error: "Please login first" };
      }

      const response = await fetch(`${API_URL}/booking/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || "Failed to fetch booking" };
      }

      return { data };
    } catch (error) {
      return { error: "Network error. Please try again." };
    }
  },
};
