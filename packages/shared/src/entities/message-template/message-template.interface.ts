import { JSONSchema } from 'json-schema-to-ts';

import {
  ChannelCTATypeEnum,
  EnvironmentId,
  IEmailBlock,
  ITemplateVariable,
  OrganizationId,
  StepTypeEnum,
  TemplateVariableTypeEnum,
} from '../../types';
import { TriggerContextTypeEnum } from '../notification-template';
import { IActor } from '../messages';
import { UiSchema } from '../../dto';

export type MessageTemplateContentType = 'editor' | 'customHtml';

export interface IMessageTemplate {
  id?: string;
  _id?: string;
  _environmentId?: EnvironmentId;
  _organizationId?: OrganizationId;
  _creatorId?: string;
  _feedId?: string;
  _layoutId?: string | null;
  _parentId?: string;
  subject?: string;
  name?: string;
  title?: string;
  type: StepTypeEnum;
  contentType?: MessageTemplateContentType;
  content: string | IEmailBlock[];
  variables?: ITemplateVariable[];
  cta?: {
    type: ChannelCTATypeEnum;
    data: {
      url?: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action?: any;
  };
  active?: boolean;
  preheader?: string;
  senderName?: string;
  actor?: IActor;
  controls?: ControlSchemas;
  output?: {
    schema: JSONSchema;
  };
  code?: string;
  createdAt?: string;
  updatedAt?: string;
}
export class ControlSchemas {
  schema: JSONSchema;
  uiSchema?: UiSchema;
}
export const TemplateSystemVariables = ['subscriber', 'step', 'branding', 'tenant', 'preheader', 'actor'];

export const SystemVariablesWithTypes = {
  subscriber: {
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    phone: 'string',
    avatar: 'string',
    locale: 'string',
    subscriberId: 'string',
  },
  actor: {
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    phone: 'string',
    avatar: 'string',
    locale: 'string',
    subscriberId: 'string',
  },
  step: {
    digest: 'boolean',
    events: 'array',
    total_count: 'number',
  },
  branding: {
    logo: 'string',
    color: 'string',
  },
  tenant: {
    name: 'string',
    data: 'object',
  },
};

export const TriggerReservedVariables = ['tenant', 'actor'];

export const ReservedVariablesMap = {
  [TriggerContextTypeEnum.TENANT]: [{ name: 'identifier', type: TemplateVariableTypeEnum.STRING }],
  [TriggerContextTypeEnum.ACTOR]: [{ name: 'subscriberId', type: TemplateVariableTypeEnum.STRING }],
};
