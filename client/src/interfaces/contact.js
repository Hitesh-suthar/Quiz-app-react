import React from 'react'
import contactSVG from './../assets/contact.svg'
const Contact = () => {

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: document.getElementById('contact-name').value,
                    email: document.getElementById('contact-mail').value,
                    message:  document.getElementById('textarea').value,
                })
            };
            fetch("/api/contact", options)
                .then(res => res.json())
                .then(res => {
                    if (res.status) {
                        document.getElementById("wm5").innerHTML = '*Thanks for reaching us!'
                        document.getElementById("wm5").style.visibility = 'visible'
                    }
                    else document.getElementById("wm5").innerHTML = '*Something went wrong!'
                })
        } catch (err) {
            console.log(err);
        }
        document.getElementById('form').reset()
    };

    return (
        <div className='container'>
            <div className='inner-container'>
                <div className='image-container'>
                    <img src={contactSVG} alt="" />
                </div>
                <div className='form-container'>
                <div className='heading'>Contact Us</div>
                <form id='form' method='post' onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="contact-name">Name</label>
                    <input type="text" id='contact-name' required />
                    <label htmlFor='contact-email'>Email</label>
                    <input type="text" id='contact-mail' required />
                    <label htmlFor='message'>message</label>
                    <textarea cols="30" rows="10" id='textarea' required></textarea>
                    <input id="submit-btn" type="submit" value='Send message'  />
                    <p className='warning-message' id='wm5'></p>
                </form>
            </div>
            </div>
        </div>
    )
}

export default Contact