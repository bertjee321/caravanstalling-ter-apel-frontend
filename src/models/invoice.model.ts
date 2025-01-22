export interface InvoiceResponseParameters {
    id: number;
    contract_id: number;
    customer_id: number;
    created_at: string;
    invoice_date: string;
    due_date: string;
    amount_excl_VAT: number;
    VAT_amount: number;
    amount_incl_VAT: number;
    paid: boolean;
    payment_date: string | null;
}

export interface InvoiceRequestParameters { 
    contract_id: number;
    customer_id: number;
    invoice_date: string;
    due_date: string;
    amount_excl_VAT: number;
    paid: boolean;
    payment_date: string | null;
}