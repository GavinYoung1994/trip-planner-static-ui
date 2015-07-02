// find data selected
$(document).ready(function() {
		

var arrayOfDays = [{hotel:[],rest:[],things:[],markers:[]}];
var current = 1;

function draw (src, list, check){
	for(var i=0; i<list.length;i++){
		if(list[i].name===check){
			var location = all_hotels[i].place[0].location;
			var icon = {icon: src};
			icon.name = check;
			icon.position = new google.maps.LatLng(location[0],location[1]);
			icon.map = map;
			var marker = new google.maps.Marker(icon);
			arrayOfDays[current-1].markers.push(marker);
		}
	}
}

function addIn (button,list, element,day) {
	$(button).click(function(){
		var dom = '<div class="itinerary-item"><span class="title">' + $('#' + element)[0].value + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';
		$(list).append(dom);
		if(element==='hotel'){
			draw('/images/lodging_0star.png',all_hotels,$('#' + element)[0].value);
			arrayOfDays[current-1].hotel.push(dom);
		}else if(element==="restaurant"){
			draw('/images/restaurant.png',all_restaurants,$('#' + element)[0].value);
			arrayOfDays[current-1].rest.push(dom);
		}else{
			draw('/images/star-3.png',all_things_to_do,$('#' + element)[0].value);
			arrayOfDays[current-1].things.push(dom);
		}
		// console.log(arrayOfDays);
	})
}


function deleteWhenDelete() {
	$(".panel-body").delegate('.remove', 'click', function () {
    	for(var i=0; i<arrayOfDays[current-1].markers.length;i++){
    		if(arrayOfDays[current-1].markers[i].name===$(this).prev().text()){
    			arrayOfDays[current-1].markers[i].setMap(null);
    			arrayOfDays[current-1].markers.splice(i,1);
    		}
    	}
    	$(this).parent()[0].remove();
    	// console.log(arrayOfDays);
	});
}


$('#add-day').click(function () {
	$('<button class="btn btn-circle day-btn">' + (parseInt($(this).prev().text())+1) + '</button>').insertBefore('#add-day')
	arrayOfDays.push({hotel:[],rest:[],things:[],markers:[]});
})

// changing days
$('.day-buttons').delegate('.day-btn', 'click', function () {
	$('.current-day').removeClass('current-day');
	$(this).addClass('current-day');
	// remove items from the day
	$('.itinerary-item').remove();
	arrayOfDays[current-1].markers.forEach(function(marker) {marker.setMap(null);})
	current = parseInt($(this).text());
	for(var i=0; i<arrayOfDays[current-1].markers.length;i++){
		arrayOfDays[current-1].markers[i].setMap(map);
	}
	for (var i = 0; i < arrayOfDays[current-1].hotel.length; i++) {
		$("#h-list").append(arrayOfDays[current-1].hotel[i]);
	};
	for (var i = 0; i < arrayOfDays[current-1].rest.length; i++) {
		$("#r-list").append(arrayOfDays[current-1].rest[i]);
	};
	for (var i = 0; i < arrayOfDays[current-1].things.length; i++) {
		$("#t-list").append(arrayOfDays[current-1].things[i]);
	};
})


addIn('#h-btn', '#h-list', 'hotel');
addIn('#r-btn', '#r-list', 'restaurant');
addIn('#t-btn', '#t-list', 'thing');
deleteWhenDelete();















});