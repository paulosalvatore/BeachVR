$(function(){
	var devicesBlock = $("#devices");

	var deviceInformationBlock = $(".device_information");
	deviceInformationClone = deviceInformationBlock.clone();
	deviceInformationBlock.remove();

	var currentsClicks = $("#current_clicks");

	$.get("https://api.myjson.com/bins/838ph", function(data, textStatus, jqXHR){
		var devices = data.devices;

		currentsClicks.text(devices.length);

		devices.reverse();

		$.each(devices, function(index, deviceInformation){
			console.log(deviceInformation);

			var newBlock = deviceInformationClone.clone();

			var newBlockInfo = newBlock.find("code");

			var html = '<b>Date (UTC):</b> ' + deviceInformation.dateTimeUtc + '<br>';
			html += '<b>Clicked Button:</b> ' + deviceInformation.clickedButton + '<br>';

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
	});

	setTimeout(function(){
		$("body").resize();
	}, 500);
});
