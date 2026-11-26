import { useEffect, useRef } from 'react';

// Native <dialog>: opens when `room` is set and calls onClose when it closes.
export default function RoomModal({ room, onClose }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (room && !dialog.open) dialog.showModal();
        if (!room && dialog.open) dialog.close();
    }, [room]);

    return (
        <dialog
            ref={dialogRef}
            className="fixed top-1/2 left-1/2 m-0 max-h-[85vh] max-w-[min(90vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-0 bg-transparent p-0 [&::backdrop]:bg-black/75 [&::backdrop]:backdrop-blur-[2px]"
            onClose={onClose}
            onClick={(event) => {
                if (event.target === dialogRef.current) onClose();
            }}
        >
            <button
                type="button"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/[0.14] bg-black/60 text-xl leading-none text-white transition-colors duration-200 hover:bg-black/85"
                aria-label="Cerrar"
                onClick={onClose}
            >
                &times;
            </button>
            {room && <img className="block max-h-[85vh] w-full rounded-2xl object-contain" src={room.img} alt={room.shortAlt} />}
        </dialog>
    );
}
