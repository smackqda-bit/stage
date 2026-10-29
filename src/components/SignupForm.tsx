'use client';

import Link from 'next/link';
import { type FormEvent, useId, useRef, useState } from 'react';
import { UNSURE_ID, directionOptions } from '@/data/directions';
import { contacts } from '@/data/site';
import {
  type LeadResponse,
  NAME_MAX,
  formatPhone,
  isValidName,
  isValidPhone,
} from '@/lib/lead';
import Arrow from './Arrow';
import styles from './SignupForm.module.css';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Field = 'name' | 'phone' | 'consent';

declare global {
  interface Window {
    ym?: (id: number, action: string, goal: string) => void;
  }
}

function reachGoal(goal: string) {
  const id = Number(process.env.NEXT_PUBLIC_YM_ID);
  if (id && typeof window.ym === 'function') window.ym(id, 'reachGoal', goal);
}

export default function SignupForm() {
  const uid = useId();
  const [direction, setDirection] = useState<string>(UNSURE_ID);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<Field, string>>>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const thanksRef = useRef<HTMLDivElement>(null);

  const ids = {
    name: `${uid}-name`,
    phone: `${uid}-phone`,
    consent: `${uid}-consent`,
    dirLabel: `${uid}-dir`,
  };

  function validate(): Partial<Record<Field, string>> {
    const errs: Partial<Record<Field, string>> = {};
    if (!isValidName(name)) errs.name = `Укажите имя: от 2 до ${NAME_MAX} букв`;
    if (!isValidPhone(phone)) errs.phone = 'Введите номер полностью: +7 (XXX) XXX-XX-XX';
    if (!consent) errs.consent = 'Нужно ваше согласие';
    return errs;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const errs = validate();
    setFieldErrors(errs);
    if (errs.name) return nameRef.current?.focus();
    if (errs.phone) return phoneRef.current?.focus();
    if (errs.consent) return consentRef.current?.focus();

    const website = (new FormData(e.currentTarget).get('website') as string | null) ?? '';

    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, direction, consent, website }),
      });
      const data = (await res.json().catch(() => null)) as LeadResponse | null;

      if (res.ok && data?.ok) {
        setStatus('sent');
        reachGoal('lead_submit');
        requestAnimationFrame(() => thanksRef.current?.focus());
        return;
      }

      if (data && !data.ok && data.field && data.field !== 'direction') {
        setFieldErrors({ [data.field]: data.error });
      }
      setError(data && !data.ok ? data.error : 'Не удалось отправить заявку.');
      setStatus('error');
    } catch {
      setError('Нет соединения с сервером.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div ref={thanksRef} tabIndex={-1} className={`dark ${styles.thanks}`} role="status">
        <p className={styles.thanksTitle}>Спасибо!</p>
        <p className={styles.thanksText}>Заявка принята. Мы свяжемся с вами в течение дня.</p>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-label="Запись на пробное занятие">
      <fieldset className={styles.fieldset}>
        <legend className={styles.label} id={ids.dirLabel}>
          Направление
        </legend>
        <div className={styles.chips}>
          {directionOptions.map((d) => (
            <button
              key={d.id}
              type="button"
              className={styles.chip}
              aria-pressed={direction === d.id}
              onClick={() => setDirection(d.id)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className={styles.field}>
        <label htmlFor={ids.name} className={styles.label}>
          Имя
        </label>
        <input
          ref={nameRef}
          id={ids.name}
          name="name"
          type="text"
          autoComplete="given-name"
          placeholder="Как к вам обращаться"
          maxLength={NAME_MAX}
          className={styles.input}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (fieldErrors.name) setFieldErrors((f) => ({ ...f, name: undefined }));
          }}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? `${ids.name}-err` : undefined}
          required
        />
        {fieldErrors.name && (
          <span id={`${ids.name}-err`} className={styles.fieldError}>
            {fieldErrors.name}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor={ids.phone} className={styles.label}>
          Телефон
        </label>
        <input
          ref={phoneRef}
          id={ids.phone}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7 (___) ___-__-__"
          className={styles.input}
          value={phone}
          onChange={(e) => {
            setPhone(formatPhone(e.target.value));
            if (fieldErrors.phone) setFieldErrors((f) => ({ ...f, phone: undefined }));
          }}
          aria-invalid={Boolean(fieldErrors.phone)}
          aria-describedby={fieldErrors.phone ? `${ids.phone}-err` : undefined}
          required
        />
        {fieldErrors.phone && (
          <span id={`${ids.phone}-err`} className={styles.fieldError}>
            {fieldErrors.phone}
          </span>
        )}
      </div>

      {/* Honeypot: скрыто от людей, боты заполняют */}
      <div className={styles.hp} aria-hidden="true">
        <label>
          Сайт
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <button type="submit" className={`btn btn-accent btn-lg ${styles.submit}`} disabled={sending}>
        {sending ? 'Отправляем…' : 'Записаться на пробное'}
        {!sending && <Arrow />}
      </button>

      <div className={styles.consent}>
        <input
          ref={consentRef}
          id={ids.consent}
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (fieldErrors.consent) setFieldErrors((f) => ({ ...f, consent: undefined }));
          }}
          aria-invalid={Boolean(fieldErrors.consent)}
          aria-describedby={fieldErrors.consent ? `${ids.consent}-err` : undefined}
        />
        <label htmlFor={ids.consent}>
          Я соглашаюсь на обработку персональных данных в соответствии с{' '}
          <Link href="/privacy">политикой конфиденциальности</Link>.
          {fieldErrors.consent && (
            <span id={`${ids.consent}-err`} className={styles.fieldError}>
              {' '}
              {fieldErrors.consent}
            </span>
          )}
        </label>
      </div>

      <div aria-live="polite" className={styles.live}>
        {status === 'error' && (
          <p className={styles.error} role="alert">
            {error} Напишите нам{' '}
            <a href={contacts.vk} target="_blank" rel="noopener noreferrer">
              ВКонтакте
            </a>{' '}
            или позвоните: <a href={contacts.phoneHref}>{contacts.phone}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
