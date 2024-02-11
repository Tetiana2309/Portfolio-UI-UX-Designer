"use strict"
//==========================================
const TELEGRAM_BOT_TOKEN = '6477571210:AAEiI03sxblOd9O08NTr7AkVuPpr-6Z98zg';
const TELEGRAM_CHAT_ID = '@TetianaWeb';
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`


async function sendEmailTelegram(event) {
    event.preventDefault();

    const form = event.target;
    const formBtn = document.querySelector('.form__submit-button button')
    const formSendResult = document.querySelector('.form__send-result')
    formSendResult.textContent = '';


    const { name, email, phone, pass } = Object.fromEntries(new FormData(form).entries());
    
    const text = `Заявка от ${name}!\nEmail: ${email}\nТелефон: ${phone}`;


    try {
        formBtn.textContent = 'Loading...';

        const response = await fetch(API, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
            })
        })
        
        if (response.ok) {
            formSendResult.textContent = 'Дякуємо за Ваше повідомлення! Ми з Вами зв`яжемося найближчим часом';
            form.reset()
        } else {
            throw new Error(response.statusText);
        }

    } catch (error) {
        console.error(error);
        formSendResult.textContent = 'Заявка не надіслана! Спробуйте пізніше.';
        formSendResult.style.color = 'red';

    } finally {
        formBtn.textContent = 'Отправить';
    }
}