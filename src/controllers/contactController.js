const Contact = require('../models/ContactModel')

exports.index = (req, res) => {
    res.render('contact', {
        contact: {}
    });
};

exports.register = async (req, res) => {
    try {
        const contact = new Contact(req.body)
        await contact.register();
        
        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }
    
        req.flash('success', 'Contact was registered successfully');
        req.session.save(() => res.redirect(`/contact/index`));
        return;
    }catch(e) {
        console.log(e);
        return res.render('pag404');
    }
};

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render('pag404');

    const contact = await Contact.searchForId(req.params.id)
    if (!contact) return res.render('pag404');

    res.render('contact', {contact});
};

exports.edit = async function(req, res) {
    try {
        if (!req.params.id) return res.render('pag404');
        const contact = new Contact(req.body);
        await contact.edit(req.params.id)
    
        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('back'));
            return;
        }
    
        req.flash('success', 'Contact was edited successfully');
        req.session.save(() => res.redirect(`/contact/index`));
        return;   
    }catch(e) {
        console.log(e);
        return res.render('pag404');
    }
}

exports.delete = async function (req, res) {
    if (!req.params.id) return res.render('pag404');

    const contact = await Contact.delete(req.params.id)
    if (!contact) return res.render('pag404');

    req.flash('success', 'Contact was deleted successfully');
    req.session.save(() => res.redirect(`back`));
    return;  
};