import { useMessages } from '@/components/hooks';
import { useState } from 'react';
import {
  Button,
  Row,
  Column,
  Select,
  Label,
  ListItem,
  TextField,
  FormButtons,
} from '@umami/react-zen';
import styles from './GoalsAddForm.module.css';

export function GoalsAddForm({
  type: defaultType = 'url',
  value: defaultValue = '',
  property: defaultProperty = '',
  operator: defaultAggregae = null,
  goal: defaultGoal = 10,
  onChange,
}: {
  type?: string;
  value?: string;
  operator?: string;
  property?: string;
  goal?: number;
  onChange?: (step: {
    type: string;
    value: string;
    goal: number;
    operator?: string;
    property?: string;
  }) => void;
}) {
  const [type, setType] = useState(defaultType);
  const [value, setValue] = useState(defaultValue);
  const [operator, setOperator] = useState(defaultAggregae);
  const [property, setProperty] = useState(defaultProperty);
  const [goal, setGoal] = useState(defaultGoal);
  const { formatMessage, labels } = useMessages();
  const items = [
    { label: formatMessage(labels.url), value: 'url' },
    { label: formatMessage(labels.event), value: 'event' },
    { label: formatMessage(labels.eventData), value: 'event-data' },
  ];
  const operators = [
    { label: formatMessage(labels.count), value: 'count' },
    { label: formatMessage(labels.average), value: 'average' },
    { label: formatMessage(labels.sum), value: 'sum' },
  ];
  const isDisabled = !type || !value;

  const handleSave = () => {
    onChange(
      type === 'event-data' ? { type, value, goal, operator, property } : { type, value, goal },
    );
    setValue('');
    setProperty('');
    setGoal(10);
  };

  const handleChange = (e, set) => {
    set(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      handleSave();
    }
  };

  return (
    <Column gap="3">
      <Label>{formatMessage(defaultValue ? labels.update : labels.add)}</Label>
      <Row gap="3">
        <Select
          className={styles.dropdown}
          items={items}
          value={type}
          onChange={(value: any) => setType(value)}
        >
          {({ value, label }: any) => {
            return <ListItem key={value}>{label}</ListItem>;
          }}
        </Select>
        <TextField
          className={styles.input}
          value={value}
          onChange={e => handleChange(e, setValue)}
          autoFocus={true}
          autoComplete="off"
          onKeyDown={handleKeyDown}
        />
      </Row>
      {type === 'event-data' && (
        <Column>
          <Label>label={formatMessage(labels.property)}</Label>
          <Row gap="3">
            <Select
              className={styles.dropdown}
              items={operators}
              value={operator}
              onChange={(value: any) => setOperator(value)}
            >
              {({ value, label }: any) => {
                return <ListItem key={value}>{label}</ListItem>;
              }}
            </Select>
            <TextField
              className={styles.input}
              value={property}
              onChange={e => handleChange(e, setProperty)}
              autoFocus={true}
              autoComplete="off"
              onKeyDown={handleKeyDown}
            />
          </Row>
        </Column>
      )}
      <Column>
        <Label>{formatMessage(labels.goal)}</Label>
        <Row gap="3">
          <TextField
            className={styles.input}
            value={goal?.toString()}
            onChange={e => handleChange(e, setGoal)}
            autoComplete="off"
            onKeyDown={handleKeyDown}
          />
        </Row>
      </Column>
      <FormButtons>
        <Button variant="primary" onPress={handleSave} isDisabled={isDisabled}>
          {formatMessage(defaultValue ? labels.update : labels.add)}
        </Button>
      </FormButtons>
    </Column>
  );
}
