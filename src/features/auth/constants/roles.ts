export const ROLES = {
  STUDENT: "student",
  RECRUITER: "recruiter",
  ADMIN: "admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_CONFIG = {
  [ROLES.STUDENT]: {
    title: "Sinh viên",
    description: "Tìm kiếm và ứng tuyển công việc phù hợp với kỹ năng của bạn",
    icon: "user",
    loginPath: "/login/student",
    canRegister: false,
    canUseGoogleAuth: false,
  },
  [ROLES.RECRUITER]: {
    title: "Nhà tuyển dụng",
    description: "Đăng tin tuyển dụng và tìm kiếm ứng viên tiềm năng",
    icon: "building",
    loginPath: "/login/recruiter",
    canRegister: true,
    canUseGoogleAuth: true,
  },
  [ROLES.ADMIN]: {
    title: "Quản trị viên",
    description: "Quản lý và giám sát toàn bộ hệ thống",
    icon: "shield",
    loginPath: "/login/admin",
    canRegister: false,
    canUseGoogleAuth: false,
  },
} as const;

export function isValidRole(role: string): role is Role {
  return (
    role === ROLES.STUDENT || role === ROLES.RECRUITER || role === ROLES.ADMIN
  );
}
