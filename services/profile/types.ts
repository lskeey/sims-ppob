export interface ProfileResponse {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface UpdateProfileRequest {
  first_name: string;
  last_name: string;
}
