import { Entity } from '@platam/shared';
import type { Statuses } from '@platam/shared';

export interface PartnerProps {
  readonly internal_id: number;
  readonly supplier_id: number;
  readonly external_id: string;
  readonly acronym: string | null;
  readonly logo_url: string | null;
  readonly co_branding_logo_url: string | null;
  readonly primary_color: string | null;
  readonly secondary_color: string | null;
  readonly light_color: string | null;
  readonly notification_email: string | null;
  readonly webhook_url: string | null;
  readonly send_sales_rep_voucher: boolean;
  readonly disbursement_notification_email: string | null;
  readonly state: Statuses;
  readonly created_at: Date;
  readonly updated_at: Date;
}

export class Partner extends Entity<PartnerProps> {
  constructor(props: PartnerProps) {
    super(props);
  }

  get id(): string {
    return this.props.external_id;
  }

  get internal_id(): number {
    return this.props.internal_id;
  }

  get supplier_id(): number {
    return this.props.supplier_id;
  }

  get external_id(): string {
    return this.props.external_id;
  }

  get acronym(): string | null {
    return this.props.acronym;
  }

  get logo_url(): string | null {
    return this.props.logo_url;
  }

  get co_branding_logo_url(): string | null {
    return this.props.co_branding_logo_url;
  }

  get primary_color(): string | null {
    return this.props.primary_color;
  }

  get secondary_color(): string | null {
    return this.props.secondary_color;
  }

  get light_color(): string | null {
    return this.props.light_color;
  }

  get notification_email(): string | null {
    return this.props.notification_email;
  }

  get webhook_url(): string | null {
    return this.props.webhook_url;
  }

  get send_sales_rep_voucher(): boolean {
    return this.props.send_sales_rep_voucher;
  }

  get disbursement_notification_email(): string | null {
    return this.props.disbursement_notification_email;
  }

  get state(): Statuses {
    return this.props.state;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  get updated_at(): Date {
    return this.props.updated_at;
  }

  toPrimitives(): Record<string, unknown> {
    return { ...this.props };
  }
}

export interface CreatePartnerProps {
  supplier_id: number;
  acronym: string | null;
  logo_url: string | null;
  co_branding_logo_url: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  light_color: string | null;
  notification_email: string | null;
  webhook_url: string | null;
  send_sales_rep_voucher: boolean;
  disbursement_notification_email: string | null;
}

export type UpdatePartnerProps = Partial<{
  acronym: string | null;
  logo_url: string | null;
  co_branding_logo_url: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  light_color: string | null;
  notification_email: string | null;
  webhook_url: string | null;
  send_sales_rep_voucher: boolean;
  disbursement_notification_email: string | null;
  state: Statuses;
}>;
