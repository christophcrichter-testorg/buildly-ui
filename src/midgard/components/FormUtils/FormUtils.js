import styled from 'styled-components';
import { rem } from 'polished';

export const FormWrapper = styled.form`
  padding: ${rem(12)};
`;

export const FieldRow = styled.div`
  display: flex;
  align-items: stretch;
`;

export const FieldWrapper = styled.div`
  padding: 0 ${rem(2)};
`;

export const ActionWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;
