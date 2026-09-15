export type CertificateStatus = "active" | "revoked";

export type Certificate = {
  id: string;
  certificateId: string;
  recipientName: string;
  courseName: string;
  issueDate: string;
  expiryDate?: string;
  description?: string;
  certificateUrl?: string;
  status: CertificateStatus;
};
