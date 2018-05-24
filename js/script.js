$(document).ready(function() {
	messagesScrollToBottom ()
});

$('#message__textarea').on('keyup', function() {
	if ($(this).scrollTop()) {
		$(this).attr('rows', 7)
	}
})

$('.star').on('mousemove', function() {
	let count = $(this).data('count')
	for(let i = 0; i < count; i++) {
		$('.star').eq(i).css('background-position', '0 -16px');
	}
})

$('.star').on('mouseleave', function() {
	$('.star').css('background-position', '0 0');
})

$('.star').on('click', function() {
	let count = $(this).data('count')
	$('.star').css('background-position', '0 0');
	for(let i = 0; i < count; i++) {
		$('.star').eq(i).css('background-position', '0 -16px');
	}
	$('.star').off('mousemove').off('mouseleave')
});


$('#message__send').on('click', function() {

	const message_text = $('#message__textarea').val().trim()

	if(!message_text.length) {
		return;
	}

	const message = $('<div>', {
		class: 'message message__client message__client_new'
	}).append($('<img>', {
		class: 'message__avatar',
		src: '/img/avatar_2.png',
		alt: 'avatar_2'
	})).append($('<div>', {
		class: 'message__text',
		text: message_text
	})).append($('<div>', {
		class: 'message__date grey',
		text: `${new Date().getHours()}: ${new Date().getMinutes()}`
	})).appendTo('#message__main');

	$('#message__textarea').val('')
	messagesScrollToBottom();

	if($('#message__textarea').attr('rows') !== '4') {
		$('#message__textarea').attr('rows', '4')
	}

	setTimeout(function() {
		$('.message__client_new').removeClass('message__client_new')
	}, 0)

})

$(document).on('keydown', function(e) {
	if(e.keyCode == 13 && e.ctrlKey) {
		$('#message__send').trigger('click')
	}
});

// $('#message__close').on('click', function() {
// 	$('#message__main, #messages_input_wrapper, #message__close').addClass('hidden');
// 	$('#message__wrapper').addClass('toggle_messages_view');
// });

$(document).on('click', '#message__close', function() {
	$('#message__main, #messages_input_wrapper, #message__close').addClass('hidden');
	$('#message__wrapper').addClass('toggle_messages_view');
})

$(document).on('click', '.toggle_messages_view', function() {
	$('#message__main, #messages_input_wrapper, #message__close').removeClass('hidden');
	$('#message__wrapper').removeClass('toggle_messages_view');
})

function messagesScrollToBottom() {
	var messages_length = $('.message').length
	$('#message__main').animate({'scrollTop': `${messages_length*999}px`}, 0);
}