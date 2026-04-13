export enum AccountTypes {
    Saving = 'saving',
    Checking = 'checking',
}

export enum OwnerTypes {
  PERSONAL = 'personal',
  BUSINESS = 'business',
}

export enum GenderTypes {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum DocTypes {
  CITIZENSHIP = 'citizenship',
  PASSPORT = 'passport',
  OTHER = 'other',
}

export enum DocIssueDateTypes {
  NATIONALITY = 'nationality',
  RESIDENCE = 'residence',
  WORK = 'work',
}

export enum ModalityTypes {
  BULLET = 'bullet',
  CUOTAS = 'cuotas',
}

export enum InstallmentFrequencyTypes {
  MONTHLY = 'monthly',
  BIWEEKLY = 'biweekly',
  WEEKLY = 'weekly',
}

export enum ExperianQueryTypes {
  HCPN = 'hcpn',
  HCPJ = 'hcpj',
}

export enum SarlaftCheckStatuses {
  CLEAN = 'clean',
  ALERT = 'alert',
  BLOCKED = 'blocked',
}

/** Consultas web asociadas a solicitudes de crédito (`web_queries.query_type`). */
export enum WebQueryType {
  BDME = 'bdme',
  RAMA_JUDICIAL = 'rama_judicial',
}

/** Recomendación del agente de análisis (`ai_agent_analysis.recommendation`). */
export enum AiAgentAnalysisRecommendation {
  HITL = 'hitl',
  INTERVIEW = 'interview',
  AUTO_APPROVE = 'auto_approve',
  AUTO_REJECT = 'auto_reject',
}

/** Tipo de producto en solicitud de desembolso (`loan_requests.product_type`). */
export enum LoanRequestProductType {
  BNPL_PARTNER = 'bnpl_partner',
  BNPL_SUPPLIER = 'bnpl_supplier',
}

/** Canal de origen (`loan_requests.channel`). */
export enum LoanRequestChannel {
  SR_PORTAL = 'sr_portal',
  CLIENT_PORTAL = 'client_portal',
  API = 'api',
}

export enum DisbursementType {
  PARTNER = 'partner',
  SUPPLIER = 'supplier',
}

export enum BatchType {
  MANUAL = 'manual',
  ACH = 'ach',
}

export enum AdjustmentsType {
  PARTIAL_RETURN = 'partial_return',
  TOTAL_RETURN = 'total_return',
  CLIENT_PAYS_PARTNER = 'client_pays_partner',
  CATEGORY_CHANGE = 'category_change',
  OTHER = 'other',
}

/** Enum para el canal de originación de pagos */
export enum PaymentChannelType {
  PAYVALIDA = 'payvalida',
  MANUAL_CLIENT = 'manual_client',
  MANUAL_LOAN = 'manual_loan',
}

/** Enum para tipo de pago */
export enum PaymentType {
  NORMAL_PAYMENT = 'normal_payment',
  INSTALLMENT_PAYMENT = 'installment_payment',
  PARTIAL_CANCELLATION = 'partial_cancellation',
  TOTAL_CANCELLATION = 'total_cancellation',
  PAYMENT_TO_PARTNER = 'payment_to_partner',
}

/** Enum para el método de pago */
export enum PaymentMethodType {
  PAYVALIDA = 'payvalida',
  TRANSFER = 'transfer',
  DEPOSIT = 'deposit',
  OTHER = 'other',
}

export enum UsuraRateType {
  USURY = 'usury',
  FIXED = 'fixed',
  ORDINARY = 'ordinary',
  CONSUMPTION = 'consumption',
  PRODUCTIVE_URBAN = 'productive_urban',
  PRODUCTIVE_RURAL = 'productive_rural',
  POPULAR_URBAN = 'popular_urban',
  POPULAR_RURAL = 'popular_rural',
  HIGH_AMOUNT = 'high_amount',
}


export enum EntityType {
  LOAN = 'loan',
  PAYMENT = 'payment',
  LOAN_REQUEST = 'loan_request',
}

export enum ActionType {
  FIELD_UPDATE = 'field_update',
  REVERSAL = 'reversal',
  RECALCULATION = 'recalculation',
}