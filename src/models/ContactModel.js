const mongoose = require('mongoose');
const validator = require('validator')

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    createdOn: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body) {
    this.body = body;
    this.errors = [];
    this.contact = null
}

Contact.searchForId = async function(id) {
    if (typeof id !== 'string') return;
    const user = await ContactModel.findById(id);
    return user;
};

Contact.prototype.register = async function() {
    this.validate();
    if (this.errors.length > 0) return;
    this.contact = await ContactModel.create(this.body);
};

Contact.prototype.validate = function() {
    this.cleanUp();

    //Email needs to be valid
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid e-mail')
    if (!this.body.name) this.errors.push('Name is a required field.')
    if (!this.body.email && !this.body.phone) {
        this.errors.push('You need to register at least one contact field.') 
    }
}

Contact.prototype.cleanUp = function() {
    for (const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        name: this.body.name,
        surname: this.body.surname,
        phone: this.body.phone,
        email: this.body.email
    };
}

module.exports = Contact;