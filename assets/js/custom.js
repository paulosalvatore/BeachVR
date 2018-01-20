$(function(){
	var devicesBlock = $("#devices");

	var deviceInformationBlock = $(".device_information");
	deviceInformationClone = deviceInformationBlock.clone();
	deviceInformationBlock.remove();

	var currentsClicks = $("#current_clicks");

	var apiKey = "AIzaSyDqlu0Y5Q-8sXe_kl1tDYdqs3qSwm8M4LE";
	var urlBase = "https://www.google.com/maps/embed/v1/place";
	urlBase += "?key="+apiKey;

	$.get("https://api.myjson.com/bins/838ph", function(data, textStatus, jqXHR){
		var devices = data.devices;

		currentsClicks.text(devices.length);

		devices.reverse();

		$.each(devices, function(index, deviceInformation){
			var newBlock = deviceInformationClone.clone();

			var newBlockInfo = newBlock.find("code");

			var html = '<b>Date (Phone):</b> ' + deviceInformation.dateTime + '<br>';
			html += '<b>Date (UTC):</b> ' + deviceInformation.dateTimeUtc + '<br>';
			html += '<b>Clicked Button:</b> ' + deviceInformation.clickedButton + '<br>';

			var mapa = newBlock.find(".mapa");

			if (deviceInformation.latitude === "undefined")
			{
				mapa.remove();

				html += '<b>Location undefined. Enable "Location Permission" on your phone.</b><br>';
			}
			else
			{
				html += '<b>Latitude:</b> ' + deviceInformation.latitude + '<br>';
				html += '<b>Longitude:</b> ' + deviceInformation.longitude + '<br>';

				var url = urlBase + "&q=" + deviceInformation.latitude + "," + deviceInformation.longitude;

				mapa.attr("src", url);
			}

			html += '<br><button>Display Tech Info</button>';
			html += '<div class="tech_info"><b>Tech Info:</b><br><br>';
			$.each(deviceInformation, function(key, value){
				html += '<b>' + key + '</b>: ' + value + '<br>';
			});
			html += '</div>';

			newBlockInfo.html(html);

			devicesBlock.append(newBlock);

			newBlock.find("button").click(function(){
				var showing = $(this).data("showing");

				if (typeof(showing) === "undefined")
					showing = true;
				else
					showing = !showing;

				$(this).data("showing", showing);

				var techInfoBlock = newBlock.closest("div").find(".tech_info");

				if (showing)
				{
					$(this).text("Hide Tech Info");
					techInfoBlock.slideDown();
				}
				else
				{
					$(this).text("Display Tech Info");
					techInfoBlock.slideUp();
				}
			});
		});
	}).done(function(){
		$("body").resize();
	});
});
