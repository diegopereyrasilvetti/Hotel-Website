import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { rooms } from '../data/rooms.js';
import { fieldClass, formCardClass, labelClass, submitClass } from './formStyles.js';

const today = () => new Date().toISOString().split('T')[0];

export default function ReservationForm() {
    const [searchParams] = useSearchParams();
    const requestedRoom = `Habitación ${searchParams.get('habitacion')}`;
    const initialRoom = rooms.some((room) => `Habitación ${room.id}` === requestedRoom) ? requestedRoom : '';

    const [habitacion, setHabitacion] = useState(initialRoom);
    const [huespedes, setHuespedes] = useState('2');
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');

    // The user may change the preselected room from the URL again while staying on the page.
    const [lastParam, setLastParam] = useState(initialRoom);
    if (initialRoom !== lastParam) {
        setLastParam(initialRoom);
        if (initialRoom) setHabitacion(initialRoom);
    }

    const handleCheckin = (event) => {
        const value = event.target.value;
        setCheckin(value);
        if (checkout && checkout <= value) setCheckout('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setFeedback(
            `¡Listo! Pediste reservar ${habitacion} del ${checkin} al ${checkout}. Te vamos a contactar para confirmar.`,
        );
        setHabitacion('');
        setHuespedes('2');
        setCheckin('');
        setCheckout('');
        setNombre('');
        setEmail('');
    };

    return (
        <form className={formCardClass} onSubmit={handleSubmit}>
            <fieldset className="m-0 grid gap-[22px] border-0 p-0">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[22px]">
                    <div className="flex flex-col gap-[7px]">
                        <label className={labelClass} htmlFor="reserva-habitacion">Habitación</label>
                        <div className="relative">
                            <select
                                className={`${fieldClass} appearance-none pr-9`}
                                id="reserva-habitacion"
                                name="habitacion"
                                required
                                value={habitacion}
                                onChange={(event) => setHabitacion(event.target.value)}
                            >
                                <option value="" disabled>Elegí una habitación</option>
                                {rooms.map((room) => (
                                    <option key={room.id} value={`Habitación ${room.id}`}>Habitación {room.id}</option>
                                ))}
                            </select>
                            <i className="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-accent" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[7px]">
                        <label className={labelClass} htmlFor="reserva-huespedes">Huéspedes</label>
                        <input
                            className={fieldClass}
                            type="number"
                            id="reserva-huespedes"
                            name="huespedes"
                            min="1"
                            max="10"
                            required
                            value={huespedes}
                            onChange={(event) => setHuespedes(event.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-[7px]">
                        <label className={labelClass} htmlFor="reserva-checkin">Check-in</label>
                        <input
                            className={`${fieldClass} [color-scheme:dark]`}
                            type="date"
                            id="reserva-checkin"
                            name="checkin"
                            min={today()}
                            required
                            value={checkin}
                            onChange={handleCheckin}
                        />
                    </div>
                    <div className="flex flex-col gap-[7px]">
                        <label className={labelClass} htmlFor="reserva-checkout">Check-out</label>
                        <input
                            className={`${fieldClass} [color-scheme:dark]`}
                            type="date"
                            id="reserva-checkout"
                            name="checkout"
                            min={checkin || today()}
                            required
                            value={checkout}
                            onChange={(event) => setCheckout(event.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-[7px]">
                    <label className={labelClass} htmlFor="reserva-nombre">Nombre</label>
                    <input
                        className={fieldClass}
                        type="text"
                        id="reserva-nombre"
                        name="nombre"
                        required
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-[7px]">
                    <label className={labelClass} htmlFor="reserva-email">Mail</label>
                    <input
                        className={fieldClass}
                        type="email"
                        id="reserva-email"
                        name="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
            </fieldset>

            <button className={submitClass} type="submit">Reservar</button>
            <p className="mt-4 text-center text-[0.92rem] text-accent empty:hidden" id="reserva-feedback" role="status">{feedback}</p>
        </form>
    );
}
