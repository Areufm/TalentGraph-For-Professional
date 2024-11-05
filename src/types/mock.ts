import { AxiosResponse } from "axios";
import { JobInfo } from "./job";
import { User } from "./user";

export interface BaseResponse<T> {
  code: number;
  data?: T;
  message: string;
}

export interface BaseRequest<T> {
  body: T;
}

export interface LoginRequest
  extends BaseRequest<{
    username: string;
    password: string;
  }> {}

export interface LoginResponse
  extends BaseResponse<{
    accessToken: string;
    refreshToken: string;
    id: number;
  }> {}

export interface RegisterRequest
  extends BaseRequest<{
    username: string;
    password: string;
    phone: string;
    email: string;
  }> {}

export interface RegisterResponse
  extends BaseResponse<{
    userId: number;
  }> {}

export interface UserInfoResponse extends BaseResponse<User> {}

export interface RefreshTokenResponse
  extends BaseResponse<{
    accessToken: string;
    refreshToken: string;
  }> {}

export interface HotWorkTagsResponse {}

export interface HotWorksRequest {
  label: string;
}

export interface HotWorksResponse extends BaseResponse<JobInfo[]> {}
