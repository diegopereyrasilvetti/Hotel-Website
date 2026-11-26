import { useState } from 'react';
import { fieldClass, labelClass, submitClass } from './formStyles.js';

export default function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');

    // No backend yet: the form only confirms on screen, nothing is sent or stored.
    const handleSubmit = (event) => {
        event.preventDefault();
        setFeedback('¡Gracias por escribirnos! Te vamos a responder a la brevedad.');
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <form
            className="mt-[30px] flex-1 basis-[360px] rounded-[24px] border border-white/[0.14] bg-white/5 p-[clamp(24px,5vw,48px)] max-[768px]:p-6"
            onSubmit={handleSubmit}
        >
            <fieldset className="m-0 grid gap-[22px] border-0 p-0">
                <div className="flex flex-col gap-[7px]">
                    <label className={labelClass} htmlFor="name">Nombre:</label>
                    <input className={fieldClass} type="text" id="name" name="name" required value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="flex flex-col gap-[7px]">
                    <label className={labelClass} htmlFor="email">Mail:</label>
                    <input className={fieldClass} type="email" id="email" name="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="flex flex-col gap-[7px]">
                    <label className={labelClass} htmlFor="message">Mensaje:</label>
                    <textarea className={`${fieldClass} min-h-[120px] resize-y`} name="message" id="message" value={message} onChange={(event) => setMessage(event.target.value)} />
                </div>
            </fieldset>

            <button className={submitClass} type="submit">Enviar</button>
            <p className="mt-4 text-center text-[0.92rem] text-accent empty:hidden" role="status">{feedback}</p>
        </form>
    );
}
