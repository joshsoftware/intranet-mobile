export type TalkItOut = {
    title: string;
    description: string;
    modal_message: string;
    hono_url: string;
    google_form_url: string;
};

export type TalkItOutResponse = {
    status : 'success' | 'error';
    message?: string;
    data?: TalkItOut;
};