export type TUpdateUserToken = {
    user_id: number;
    refresh_token: string;
    last_login_at: Date;
    last_login_ip: string;
};

export type TUpdateUserProfile = {
    user_id: string;
    full_name: string;
    contact_number: string;
    phone_code: number;
    address: string;
};

export type TUpdateUserPassword = {
    user_id: string;
    password: string;
};
