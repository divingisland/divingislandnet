(function($){})(window.jQuery);

jQuery(document).ready(function (){

	//
	// Menu
	//

	$(".menu .menu__button").on("click", function(event){
		$("body").toggleClass("menu--on");
		$("body").removeClass("menu__up");
		$("body").one("keyup", function(event){
			if (event.keyCode === 27 && $("body.menu--on").length) {
				$("body").removeClass("menu--on");
			}
		});
		$(".menu__nav").one("click", function(){
			$("body").removeClass("menu--on");
		});
		event.preventDefault();
	});

	//
	// Flickity
	//
	var $carousel = $('.main-carousel');
	$carousel.flickity({
		// options
		cellAlign: 'left',
		contain: true,
		fullscreen: false,
		autoPlay: false,
		wrapAround: true,
		prevNextButtons: false,
		pageDots: false
	});
	// previous
	$('.button--previous').on( 'click', function() {
		$carousel.flickity('previous');
	});
	// next
	$('.button--next').on( 'click', function() {
		$carousel.flickity('next');
	});
	var $reviewsCarousel = $('.reviews-carousel');
	$reviewsCarousel.flickity({
		// options
		cellAlign: 'left',
		contain: false,
		fullscreen: false,
		autoPlay: 5000,
		wrapAround: true,
		prevNextButtons: true,
		pageDots: false
	});

	//
	// Booking form
	//
	// runs datepicker
	var dateToday = new Date();
	$( ".datepicker" ).datepicker({minDate: dateToday, defaultDate: null});
	// takes value from calendar
	$('#datepicker').change(function(){
    	$('.datepicker').datepicker('setDate', $(this).val());
	});
	$('.datepicker').change(function(){
	    $('#datepicker').attr('value',$(this).val());
		$('.datepicker').hide();
	});
	// shows calendar on focus
	$(".select--datepicker").click(function() {
		$('.datepicker').show();
	});
	$(document).mouseup(function(e){
		var container = $(".select--datepicker");
		// if the target of the click isn't the container nor a descendant of the container
		if (!container.is(e.target) && container.has(e.target).length === 0){
			$('.datepicker').hide();
		}
	});

	$(".btn-book").on("click", function(event){
		$("body").addClass("booking-on");
		event.preventDefault();
	});

	$(".booking__form").perfectScrollbar({'wheelPropagation': true});

	$(".booking__cover, .booking__top--close a").on("click", function(event){
		$("body").removeClass("booking-on");
		event.preventDefault();
	});

	$(".booking__form .booking__extra, .booking__form select").on("change", function(){
		updatePrice();
	});

	function updatePrice() {
		var price = parseInt($(".booking__form .form").eq(0).data("price"));
		$(".booking__form .booking__extra").each(function(){
			if ($(this).is(':checked')) {
				price = price + parseInt($(this).val());
			}
		});
		$(".btn--next span").text(price + " ISK");
	}

	$(".btn--step2").on("click", function(event){
		$(".booking__step--1").hide();
		$(".booking__step--2").show();
		event.preventDefault();
	});

	// form
	var $contactForm = $('.form');
	var $contactFormMessages = $('.booking__form--messages');
	$contactForm.submit(function(e) {
		e.preventDefault();
		$.ajax({
			url: 'https://formspree.io/xdznyqvx',
			method: 'POST',
			data: $(this).serialize(),
			headers: {"Accept": "application/json"},
			dataType: 'json',
			beforeSend: function() {
				$contactFormMessages.append('<div class="alert alert--loading"><h2>Sending message…</h2></div>');
				$contactForm.hide();
			},
			success: function(data) {
				$contactFormMessages.find('.alert--loading').hide();
				$contactFormMessages.append('<div class="alert alert--success"><h2>Thank you!</h2><p>Your booking has been received. We will be in touch shortly!</p></div>');
			},
			error: function(err) {
				$contactFormMessages.find('.alert--loading').hide();
				$contactFormMessages.append('<div class="alert alert--error"><h2>Ops</h2><p>There was an error. Please try again.</p></div>');
			}
		});
	});
	
});
