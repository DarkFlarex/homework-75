export interface CipherText {
    password: string;
    message: string;
    encoded?: string;
    decoded?: string;
}

export interface CipherTextMutation {
    password: string;
    message: string;
    encoded?: string;
    decoded?: string;
}