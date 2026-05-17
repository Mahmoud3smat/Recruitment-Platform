import { User } from "@/Contexts/AuthContext";

type AuthPayload = {
  user?: Partial<User>;
  data?: Partial<User> | { user?: Partial<User> };
  profile?: Partial<User>;
  candidate?: Partial<User>;
  company?: Partial<User>;
  jobSeeker?: Partial<User>;
};

type UserFallbacks = Partial<User> & {
  role: User["role"];
};

export function normalizeAuthUser(
  payload: AuthPayload,
  fallbacks: UserFallbacks,
) {
  const dataUser =
    payload?.data && "user" in payload.data ? payload.data.user : payload?.data;
  const rawUser =
    payload?.user ||
    dataUser ||
    payload?.profile ||
    payload?.candidate ||
    payload?.company ||
    payload?.jobSeeker ||
    {};

  return {
    ...rawUser,
    ...fallbacks,
    fullName:
      rawUser.fullName ||
      rawUser.name ||
      rawUser.firstName ||
      fallbacks.fullName ||
      fallbacks.name,
    companyName:
      rawUser.companyName || fallbacks.companyName || fallbacks.name,
    email: rawUser.email || fallbacks.email,
    role: rawUser.role || fallbacks.role,
  } as User;
}

export function getUserDisplayName(user: User | null) {
  if (!user) return "";

  return (
    user.fullName ||
    user.name ||
    user.companyName ||
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.email?.split("@")[0] ||
    ""
  ).trim();
}

export function getUserFirstName(user: User | null, fallback: string) {
  const displayName = getUserDisplayName(user);

  return displayName.split(" ")[0] || fallback;
}

export function getUserDashboardPath(user: User | null) {
  if (user?.role === "company") return "/company-dashboard";

  return "/seeker-dashboard";
}
