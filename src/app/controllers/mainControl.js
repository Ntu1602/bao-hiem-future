
class mainControl{
     showHome(req,res) {
        res.render('home');
    };
    showEventDetail(req,res){
        res.render("event-detail");
    };
    showEventListing(req,res){
        res.render("event-listing");
    };
}

module.exports = new mainControl;