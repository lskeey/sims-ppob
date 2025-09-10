export interface TransactionRequest {
  service_code: string;
}

export interface TransactionResponse {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}

export interface TransactionHistoryResponse {
  offset: number;
  limit: number;
  records: TransactionResponse[];
}
