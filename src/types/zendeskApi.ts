// Zendesk API のリクエスト型定義

// Zendesk API のレスポンス型定義

export interface ZendeskTicket {
    id: number;
    subject: string;
    description: string;
    status: 'new' | 'open' | 'pending' | 'hold' | 'solved' | 'closed';
    priority: 'low' | 'normal' | 'high' | 'urgent' | null;
    type: 'problem' | 'incident' | 'question' | 'task' | null;
    requester_id: number;
    assignee_id: number | null;
    created_at: string;
    updated_at: string;
    tags: string[];
}

export interface ZendeskUser {
    id: number;
    name: string;
    email: string;
    role: 'end-user' | 'agent' | 'admin';
    created_at: string;
    updated_at: string;
}

export interface ZendeskComment {
    id: number;
    type: 'Comment' | 'VoiceComment';
    body: string;
    author_id: number;
    created_at: string;
    public: boolean;
}
