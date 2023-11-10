import { Friend, User } from "src/types/generic.types";

export interface UserAvatarProps {
    profile?: User | Friend
    size?: 'md' | 'lg'
}