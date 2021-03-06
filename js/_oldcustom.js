$(document).ready(function() {
	
	
//////////////////////////	Validaitioieortnnn
$.validator.setDefaults({
		highlight: function(element) {
			$(element).closest('.form-group').addClass('has-error');
		},
		unhighlight: function(element) {
			$(element).closest('.form-group').removeClass('has-error');
		},
		errorElement: 'label',
		errorClass: 'error',
		errorPlacement: function(error, element) {
			if(element.parent('.input-group').length) {
				error.insertAfter(element.parent());
			} else {
				error.insertAfter(element);
			}
		}
	});


	$.validator.addMethod("nameRegExp", function(value, element) {
        return this.optional(element) || /^[a-zA-Z-\s]+$/i.test(value);
    }, "You can only use letters and hyphens.");
	
	$.validator.addMethod("subjectRegExp", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\s]+$/i.test(value);
    }, "Letters, numbers and spaces are allowed only.");
		
	$.validator.addMethod("messageRegExp", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\s]+$/i.test(value);
    }, "You can only use letters and numbers.");
	
	$.validator.addMethod("messageBoxRegExp", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\s]+$/i.test(value);
    }, "You can only use letters and numbers.");

    $("#contact_form").validate({
        rules: {
            "name": {
                required: true,
                nameRegExp: true
           		    },
			"phone": {
				 required: true,
				 digits: true
			         },
			"email": {
				required: true,
				email: true
					},
			"subject": {
				required: true,
				subjectRegExp: true 
					},
//			"enquiry": {
//				required: true,
//				messageRegExp: true
//					},
			"messageBox": {
				required: true,
				messageBoxRegExp: true
					},
       		 },
        messages: {
            "name": {
                required: "You must enter a name.",
                nameRegExp: "Only letters and the character - are accepted."
            		},
			 "phone": {
                required: "You must enter a phone number.",
                digits: "Only numbers are accepted."
            		},
			 "email": {
                required: "You must enter an email address.",
                email: "You must enter a valid email."
            		},
			 "subject": {
                required: "You must enter a subject.",
                subjectRegExp: "Only letters and numbers are allowed."
            		},
//			  "enquiry": {
//                required: "You must enter a message.",
//                messageRegExp: "Only letters, numbers and the characters !?- are allowed."
//            		},
			  "messageBox": {
                required: "You must enter a message.",
                messageRegExp: "Only letters, numbers and the characters !?- are allowed."
            		}
       			 }

});
/////////////////
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
// Show app request //					   

$('#add-agreement').click(function(a){
	//alert ("ha");
	$('#add-agreement').hide();
	$('.agreement-box').show();
});

	$(".modal-content form button[type=submit]").click(function(e) {
		e.preventDefault();	
										
		var form = $(this).closest('form');
		var formName = form.attr("name");
			
		if(formName == "loginForm") {
			
			var data = $(formName).serializeArray();
			data.push({name: 'email', value: $('#inputEmail').val()});
			data.push({name: 'password', value: $('#inputPassword').val()});
			if($('#login_expert').is(':checked')) { data.push({name: 'table', value: 'e_accounts'}); }
			if($('#login_mro').is(':checked')) { data.push({name: 'table', value: 'm_accounts'}); }
			
			$.post(
		   'pages/calls/login.php',
			data,
			function(data){
			  $(".modal-message").html(data);
			  window.location.replace("http://192.168.3.215/comparemedicalexperts/index.php");	
			}
		  );
		} 
	});	
	
// VENUE SELECTION FUNCTION START // 

	//$('#venue_id').focus(function(e){
	$(document).ready(function(e){
								  
		 var venue = document.getElementById('#venue_id'); 
			 
			 $("#venue_id").load("includes/get-venue-db.php",function( response, status, xhr ) {
					if ( status == "error" ) {
						var msg = "Sorry but there was an error: ";
						$( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
					}
				});
		}
	)
	
// VENUE SELECTION FUNCTION END //

// APP SELECTION FUNCTION START //

	$('.afterdate').change(function(e){
												
		$("#appointmentSelection").show();
		
		 var beforedate = $(".beforedate").val();

		 var data = $("#expert-booking-stats").serializeArray();
		 
		 //data.push({name: 'beforedate', value: beforedate });
		 //data.push($(".beforedate").val());
		 
		 
		 
			 //CHECK DIRECTORY LOCATION BY REDIRECTING 
			 //$(location).attr('href', 'includes/get-venue-db.php');
			 
			 $.post(
			   'includes/get-appointments.php',
				data,
				function(data){
					//alert(data);
					$('#appointment_id').html(data);
				}
			  );
		}
	)
	
	// APP SELECTION FUNCTION START //

	$('#request_appointment').click(function(e){
		
		 var beforedate = $(".beforedate").val();

		 var data = $("#expert-booking-stats").serializeArray();
			 
			 $.post(
				'includes/find-app-requests.php',
				data,
				function(data){
					//alert(data);
					$('#app-times').html(data);
				}
			  );
		}
	)

	
	$("#get-appointment-details").click(function(e) {
			e.preventDefault();

			
			var data = $("#get-appointment-details").serializeArray();
			data.push({name: 'appointment_id', value: $("#appointment_id :selected").attr("name")});

			$.post(
			   'includes/edit-existing-appointment.php',
				data,
				function(data){
				  $("#appointment-details").html(data);  
				  //window.location.replace("http://192.168.3.215/comparemedicalexperts/includes/add-existing-postcode.php");
				}
			  );
		});
	
	$("#editedAppointmentSubmit").click(function(e) {
			e.preventDefault();

			
			var data = $("#addVenueForm").serializeArray();
			data.push({name: 'eap_newtimehour', value: $("#eap_newtimehour :selected").attr("value")});
			data.push({name: 'eap_newtimeminute', value: $("#eap_newtimeminute :selected").attr("value")});
			data.push({name: 'new-venue_id', value: $("#new-venue_id :selected").attr("name")});

			$.post(
			   'includes/submit-edited-appointment.php',
				data,
				function(data){
					$("#succesful-message").html(data); 
				}
			  );
		});
	
// APP SELECTION FUNCTION END //

// EXISTING VENUE SELECTION FUNCTION START //
	
	//$('#e_venue_id').focus(function(e){
	$(document).ready(function(e){
									
		 var venue = document.getElementById('#e_venue_id');
		 
			 //CHECK DIRECTORY LOCATION BY REDIRECTING
			 //$(location).attr('href', 'includes/get-venue-db.php');
			 
			 $("#e_venue_id").load("includes/get-all-venue-db.php",function( response, status, xhr ) {
					if ( status == "error" ) {
						var msg = "Sorry but there was an error: ";
						$( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
					}
				});
		}
	)
	
	$("#existing-venue-add").click(function(e) {
			e.preventDefault();

			
			var data = $("#existing-venue-add").serializeArray();
			data.push({name: 'e_venue_id', value: $("#e_venue_id :selected").attr("name")});

			$.post(
			   'includes/add-existing-postcode.php',
				data,
				function(data){
				  $("#modal-form-venue-addven").html(data);  
				  //window.location.replace("http://192.168.3.215/comparemedicalexperts/includes/add-existing-postcode.php");
				}
			  );
		});

	
// EXISTING VENUE SELECTION FUNCTION END //

// MRO SELECTION FUNCTION START //

	//$('#mro_id').focus(function(e){
	$(document).ready(function(e){						  
		 
		 var maMro = document.getElementById('#mro_id');
		 
			 //CHECK DIRECTORY LOCATION BY REDIRECTING
			 //$(location).attr('href', 'includes/get-venue-db.php');
			 
			 $("#mro_id").load("includes/get-mro-db.php",function( response, status, xhr ) {
					if ( status == "error" ) {
						var msg = "Sorry but there was an error: ";
						$( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
					}
				});
		}
	)

// MRO SELECTION FUNCTION END //

// EXPERT SELECTION FUNCTION START //

	//$('#expert_id').focus(function(e){
	$(document).ready(function(e){								 
		 
		 var ea_exp = document.getElementById('#expert_id');
		 
			 //CHECK DIRECTORY LOCATION BY REDIRECTING
			 //$(location).attr('href', 'includes/get-venue-db.php');
			 
			 $("#expert_id").load("includes/get-expert-db.php",function( response, status, xhr ) {
					if ( status == "error" ) {
						var msg = "Sorry but there was an error: ";
						$( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
					}
				});
		}
	)

// SEACH FOR VENUE POSTCODE ON SUBMIT

	$("#expert-search-postcode").click(function(e) {
			e.preventDefault();

			var data = $("#v_search_postcode").serializeArray();
			//data.push({name: 'e_venue_id', value: $("#e_venue_id :selected").attr("name")});
				
			//alert($("#claimForm").serialize());
			
			$.post(
			   'includes/search-venue-postcode.php',
				data,
				function(data){
				  $("#postcode-results").html(data);  
				}
			  );
		});

//
	$(".app-form-submit").click(function(e) {
		e.preventDefault();
		
	
		var data = $("#expert-add-app").serializeArray();
		data.push({name: 'venue_id', value: $("#venue_id :selected").attr("name")});
		data.push({name: 'mro_id', value: $("#mro_id :selected").attr("name")});
		//var venueID = $("#venue_id :selected").attr("name");
		//alert($("#claimForm").serialize());
		
		$.post(
		   'pages/formupload.php',
			data,
			function(data){
			  $("#success-message").html(data);  
			}
		  );
		// CODE STOPS FORM FROM POSTING TO DB .delay($(location).attr('href', 'index.php?page=appointments&action=add'););
	});
	
	$(".selectVenue").click(function(e) {
		e.preventDefault;
		alert($(this).attr("v_id"));								 
	});
	
	$(".add-venue").click(function(e) {
		$(".add-venue-container").toggle();							   
	});
	
	$('[data-toggle="tooltip"]').tooltip();
	
	$('body').on('hidden.bs.modal', '.modal', function () {
	   //document.location.reload();
	   //window.location.replace("http://192.168.3.210/comparemedicalexperts/");
	});
	
	function padLeft (str, max) {
	  str = str.toString();
	  return str.length < max ? padLeft("0" + str, max) : str;
	}
	
	function padRight (str, max) {
	  str = str.toString();
	  return str.length < max ? padRight(str + "0", max) : str;
	}

/* START OF APPOINTMENT SLOT GENERATION ON THE ADD APPOINTMENTS PAGE */
	
	$("#app-slot-generate").click(function(e) {
		e.preventDefault();
		var last_slot = 60 / $("#add-app-freq").val();
		
		//$(".select-app-slots").html("<div class = 'checklist'>");
		
		var counter = 0;
		
		for(i=$("#add-app-start").val(); i != $("#add-app-last").val(); i++) {
			
			$(".select-app-slots").append('<br />' + i + ":00 <i class = 'fa fa-sm fa-arrow-right'></i><br /><div class='title-divider'></div>");

			
			for(j= 0; j < last_slot; j++) {	
				//$(".select-app-slots").append(j * $("#add-app-freq").val());
			   $(".select-app-slots").append('<input type="checkbox" name="app_slot[]" id="app_slot' + j +
				'" value="' + padLeft(i, 2) + ":" + padRight((j * $("#add-app-freq").val()), 2) +'" /> ' + (j * $("#add-app-freq").val()) + '<br />'); counter++;}//for inner

		}//for outer
		//$(".select-app-slots").html("</div>");
	});//app generator
	
	
/* START OF APPOINTMENT SLOT GENERATION ON THE ADD APPOINTMENTS PAGE */
	/*
	$("#app-slot-generate").click(function(e) {
		e.preventDefault();
		var last_slot = 60 / $("#add-app-freq").val();
		
		$(".select-app-slots").html("");
		
		var counter = 0;
		
		for(i=$("#add-app-start").val(); i != $("#add-app-last").val(); i++) {
			$(".select-app-slots").append("<br />" + i + "<br />");
			
			/*if($("#add-app-start").val() > $("#add-app-last").val()){
				alert("This statement translates to if " + $("#add-app-start").val() + " Is more than " + $("#add-app-last").val() + " create this alert");	
			}*/
			
		//	for(j= 0; j < last_slot; j++) {	
				//$(".select-app-slots").append(j * $("#add-app-freq").val());
				/*
			   $(".select-app-slots").append('<input type="checkbox" name="app_slot[]" id="app_slot' + j + '" value="' + padLeft(i, 2) + ":" + padRight((j * $("#add-app-freq").val()), 2) +'" /> ' + (j * $("#add-app-freq").val()) + '<br />');
			   counter++;
			}
			
		}
	});*/

	
	
	
	
	
	
	
/* END OF APPOINTMENT SLOT GENERATION ON THE ADD APPOINTMENTS PAGE */
	
	$("#show-expert-apps").hide();
	
	$('#expert-add-app .input-group.date').datepicker({
		todayBtn: "linked",
		format: 'dd-mm-yyyy',
		todayHighlight: true
	});
	
	$('#expert-add-app .input-group.date-book').datepicker({
		todayBtn: "linked",
		format: 'dd-mm-yyyy',
		todayHighlight: true
	});
		
	$('#expert-account .input-group.date').datepicker({
		todayBtn: "linked",
		format: 'dd-mm-yyyy',
		todayHighlight: true
	});
	
	$('#expert-waiting-room .input-group.date').datepicker({
		todayBtn: "linked",
		format: 'dd-mm-yyyy',
		todayHighlight: true
	});
	
	$('#mro-waiting-room .input-group.date').datepicker({
		todayBtn: "linked",
		format: 'dd-mm-yyyy',
		todayHighlight: true 
	});
	
	$('#expert-booking-stats .input-group.date').datepicker({
		todayBtn: "linked",
		format: 'dd-mm-yyyy',
		todayHighlight: true
	});
	
	$('#addVenueForm .input-group.date').datepicker({
		todayBtn: "linked",
		format: 'dd-mm-yyyy',
		todayHighlight: true
	});
	
	$("#hide-expert-apps").click(function(e) {
   		$(".inactive").css({"background-color":"transparent","color":"white", "border":"none"});		
		$(this).hide();
		$("#show-expert-apps").show();
	});
	
	$("#hide-expert-apps").click(function(e) {
   		$(".1-inactive").css({"background-color":"transparent","color":"white", "border":"none"});		
		$(this).hide();
		$("#show-expert-apps").show();
	});
		
	$("#hide-expert-apps").click(function(e) {
   		$(".active-taken").css({"background-color":"transparent","color":"white", "border":"none"});		
		$(this).hide();
		$("#show-expert-apps").show();
	});
	
	$("#hide-expert-apps").click(function(e) {
   		$(".1-active-taken").css({"background-color":"transparent","color":"white", "border":"none"});		
		$(this).hide();
		$("#show-expert-apps").show();
	});
	
	$("#hide-expert-apps").click(function(e) {
   		$(".2-active-taken").css({"background-color":"transparent","color":"white", "border":"none"});		
		$(this).hide();
		$("#show-expert-apps").show();
	});
	
	$("#hide-expert-apps").click(function(e) {
   		$(".3-active-taken").css({"background-color":"transparent","color":"white", "border":"none"});		
		$(this).hide();
		$("#show-expert-apps").show();
	});
	
	$("#hide-expert-apps").click(function(e) {
   		$(".4-active-taken").css({"background-color":"transparent","color":"white", "border":"none"});		
		$(this).hide();
		$("#show-expert-apps").show();
	});
	
	$("#show-expert-apps").click(function(e) {
   		$(".inactive").removeAttr( 'style' );		
		$(this).hide();
		$("#hide-expert-apps").show();
	});
	
	$("#show-expert-apps").click(function(e) {
   		$(".1-inactive").removeAttr( 'style' );		
		$(this).hide();
		$("#hide-expert-apps").show();
	});
	
	$("#show-expert-apps").click(function(e) {
   		$(".active-taken").removeAttr( 'style' );		
		$(this).hide();
		$("#hide-expert-apps").show();
	});
	
	$("#show-expert-apps").click(function(e) {
   		$(".1-active-taken").removeAttr( 'style' );		
		$(this).hide();
		$("#hide-expert-apps").show();
	});
	
	$("#show-expert-apps").click(function(e) {
   		$(".2-active-taken").removeAttr( 'style' );		
		$(this).hide();
		$("#hide-expert-apps").show();
	});
	
	$("#show-expert-apps").click(function(e) {
   		$(".3-active-taken").removeAttr( 'style' );		
		$(this).hide();
		$("#hide-expert-apps").show();
	});
	
	$("#show-expert-apps").click(function(e) {
   		$(".4-active-taken").removeAttr( 'style' );		
		$(this).hide();
		$("#hide-expert-apps").show();
	});
	
	// DATA WINDOW = 1 > Imports all html data into from thisdoc.php into the div #dateTable // 

	$('#submit-data').click(function(e){
		e.preventDefault();
		
		var data = $("#expert-add-app").serializeArray();	
			
		$.post(
		   //'pages/main/experts/pages/expert-book-app.php',
		   'thisdoc.php',
			data,
			function(data){
			  $("#dateTable").html(data);  
			}
		  );
		
		//$("#dateTable").load('thisdoc.php');
	});
	
	$('#mro-submit-data').click(function(e){
		e.preventDefault();
		
		var data = $("#expert-add-app").serializeArray();
		data.push({name: 'expert_id', value: $("#expert_id :selected").attr("name")});
			
		$.post(
		   'mro-book-app.php',
			data,
			function(data){
			  $("#dateTable").html(data);  
			}
		  );
		
		//$("#dateTable").load('thisdoc.php');
	});
	
	// DATA WINDOW = 2 > Imports all html data into from thisdoc.php into the div #dateTable // 
	
	$('#yesterdayApps').click(function(e){
		e.preventDefault();

		$("#dateTable").load('yesterdays-app.php');
	});
	
	// DATA WINDOW = 3 > Imports all html data into from thisdoc.php into the div #dateTable // 
	
	$('#tomorrowApps').click(function(e){
		e.preventDefault();
		
		$("#dateTable").load('tomorrows-app.php');
	});
	
	$('#todaysApps').click(function(e){
		e.preventDefault();
		//alert("This Works");
		$("#dateTable").load('todays-apps.php');
	});
	
	$('#this').click(function(e){
		e.preventDefault();

		$("#time-slots").load('thisdoc.php');
	});
	
	// TIME MODAL OVERLAY START //
	
	$(".show-overlay").click(function(e) {
									$("#overlay").show();
									$("#overlay #overlay-content #overlay-title").text($(this).attr("title"));
									var pageValues = $(this).attr("id").split(":");
									
									var callPage = pageValues[0];
									var callValues = pageValues[1];
									
									$.post( "pages/popup-call.php", { 
													callPage: callPage,   
													callValues: callValues
									})
									.done(function( data ) {
													$("#overlay #overlay-content #overlay-text").html(data);
									});
					});
	
	$("#close").click(function(e) {
							$("#overlay").hide();
								   
	});
	
							//$("#overlay").hide();
		
	// TIME MODAL OVERLAY END //

	});

	$(".pass-this-venue").click(function(e) {
		e.preventDefault();
		alert("Appointment Confirmed");
	
		var data = $("#expert-add-app").serializeArray();
		data.push({name: 'venue_id', value: $("#venue_id :selected").attr("name")});
		data.push({name: 'mro_id', value: $("#mro_id :selected").attr("name")});
		//var venueID = $("#venue_id :selected").attr("name");
		//alert($("#claimForm").serialize());
		
		$.post(
		   'pages/formupload.php',
			data,
			function(data){
			  $(".messages").html(data);  
			}
		  );
		// CODE STOPS FORM FROM POSTING TO DB .delay($(location).attr('href', 'index.php?page=appointments&action=add'););
	});


// HELP OVERLAY FOR POSTCODE SEARCHY THING // 
		$(document).ready(function(){
			$("#existing-venue").mouseenter(function(){
				$(".helpbox").replaceWith( "Help info!" );
			});
			$("#existing-venue").mouseleave(function(){
				$(".helpbox").replaceWith( "WHY" );
			});
		});


		$("#msg_btn").click(function(){
			$("#messages-subject").show();		//
			$("#app-change-subject").hide();
			$("#app-request-subject").hide();
			$("#cancel-subject").hide();
			$("#agreement-subject").hide();
			$("#archived-subject").hide();
		});
		$("#appup-btn").click(function(){
			$("#messages-subject").hide();
			$("#app-change-subject").show();	//
			$("#app-request-subject").hide();
			$("#cancel-subject").hide();
			$("#agreement-subject").hide();
			$("#archived-subject").hide();
		});
		$("#appreq-btn").click(function(){
			$("#messages-subject").hide();
			$("#app-change-subject").hide();
			$("#app-request-subject").show();	//
			$("#cancel-subject").hide();
			$("#agreement-subject").hide();
			$("#archived-subject").hide();
		});
		$("#canc_btn").click(function(){
			$("#messages-subject").hide();
			$("#app-change-subject").hide();
			$("#app-request-subject").hide();
			$("#cancel-subject").show();		//
			$("#agreement-subject").hide();
			$("#archived-subject").hide();
		});
		$("#agreement-btn").click(function(){
			$("#messages-subject").hide();
			$("#app-change-subject").hide();
			$("#app-request-subject").hide();
			$("#cancel-subject").hide();
			$("#agreement-subject").show();	
			$("#archived-subject").hide();		//
		});
		$("#archived-btn").click(function(){
			$("#messages-subject").hide();
			$("#app-change-subject").hide();
			$("#app-request-subject").hide();
			$("#cancel-subject").hide();
			$("#agreement-subject").hide();	
			$("#archived-subject").show();		//
		});

		
		$(".subjectBox").click(function() {
		
		var data = $(this).attr("name");
		
		$(this).removeClass("subjectBox");

		$.post("includes/get_message_content.php", {
			data:data
			})
			.done(function(data){
			  $("#content-block").html(data);  
			  return true;
			})
		});
		
		
		$("#messageUpdate").click(function() {
										  	
		var data = $('#archiveMessage').serialize();
	
		$.post("includes/archive_update.php",
			data,
			function(data){
			  $("#archiveSuccess").html(data);  
			   location.reload();
			})
		});
		
		$("#archivedelete").click(function() {
										  	
		var data = $('#archiveMessage').serialize();
	
		$.post("includes/archive_delete.php",
			data,
			function(data){
			  $("#archiveSuccess").html(data);  
			   location.reload();
			})
		});
		
		$("#mroArchiveUpdate").click(function() {
										  	
		var data = $('#mroArchiveMessage').serialize();
	
		$.post("includes/mro_archive_update.php",
			data,
			function(data){
			  $("#archiveSuccess").html(data);  
			 // location.reload();
			})
		});
		
		$("#mroMessageDelete").click(function() {
										  	
		var data = $('#mroArchiveMessage').serialize();
	
		$.post("includes/mro_archive_delete.php",
			data,
			function(data){
			  $("#archiveSuccess").html(data);  
			  location.reload();
			})
		});
		
		
		//$('#new-venue_id').focus(function(e){
		$(document).ready(function(e){								  
		 
			 var venue = document.getElementById('#new-venue_id');
				 
				 $("#new-venue_id").load("includes/get-venue-db.php",function( response, status, xhr ) {
						if ( status == "error" ) {
							var msg = "Sorry but there was an error: ";
							$( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
						}
					});
			}
		)
		
		// SEND MESSAGE //
		
		$("#submit-expert-message").click(function(e) {
			e.preventDefault();

			var data = $("#submit-expert-message-form").serializeArray();
			data.push({name: 'mro_id', value: $("#mro_id :selected").attr("name")});

			//alert("Appointment Confirmed");
			
			$.post(
			   'includes/submit-expert-message.php',
				data,
				function(data){
				  $("#success-message").html(data);  
				}
			  );
			$("#msg-sent").show();
		});
		
		
		
		$("#submit-mro-message").click(function(e) {
			e.preventDefault();

			var data = $("#submit-mro-message-form").serializeArray();
			data.push({name: 'ea_id', value: $("#ea_id :selected").attr("name")});

			//alert("Appointment Confirmed");
			
			$.post(
			   'includes/submit-mro-message.php',
				data,
				function(data){
				  $("#success-message").html(data);  
				}
			  );
			$("#msg-sent").show();
		});
		
		
		
		$("#add-app-start").change(function(e) {
			e.preventDefault();						
			
			var dropdown = $("#expert-add-app").serializeArray();
			dropdown.push({name: 'add-app-start', value: $("#add-app-start :selected").attr("value")});
			
			$.post(
			  'pages/main/experts/pages/end-time-dropdown.php',
				dropdown,
				function(dropdown){
				  $("#end-time").html(dropdown);  
					$("#app-slot-generate").show();	 
				}
			  );
			 
		});
