import validator from "validator";

export default class Contacts {
    constructor (formClass, body) {
        this.form = document.querySelector(formClass);
        this.body = body;
    }

    init() {
        this.events();
    };

    events(e) {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    };

    validate(e) {
        this.cleanUp();

        const el = e.target;
        const nameInput = el.querySelector('input[name = "name"]');
        const surnameInput = el.querySelector('input[name = "surname"]');
        const phoneInput = el.querySelector('input[name = "phone"]');
        const emailInput = el.querySelector('input[name = "email"]');
        let error = false;

        if (nameInput.value < 1) {
            alert('The field "Name" cannot be empty');
            error = true;
        }
        
        if (emailInput.value && !validator.isEmail(emailInput.value)) {
            alert('Invalid email');
            error = true;
        } 
        
        if (!emailInput.value && !phoneInput.value) {
            alert('You need to register at least one contact field.');
            error = true;
        }

        if (!error) el.submit();
    };


    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            name: this.nameInput,
            surname: this.surnameInput,
            phone: this.phoneInput,
            email: this.emailInput
        };
    };
}