export default function MapDouala() {
    return (
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63525.42026218944!2d9.6683938!3d4.0510568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10610d49ff0874ff%3A0x6b689f276d8f3a36!2sDouala%2C%20Cameroun!5e0!3m2!1sfr!2s!4v1690123456789"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
}
