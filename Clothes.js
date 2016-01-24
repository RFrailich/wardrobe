		// adds a new clothing item to wardrobe (loca; storage)
		function AddClothingItem(name, type, filePath) {
			var id = localStorage.ImageID;
			localStorage.ImageID ++;

			var wardrobe = JSON.parse(localStorage.Wardrobe);
			wardrobe[id] = {
				name: name,
				type: type,
				filePath: filePath
			};

			localStorage.setItem('Wardrobe', JSON.stringify(wardrobe));
		}

		function DisplayClothingItem(rowID, itemID, wardrobe) {

			var item = wardrobe[itemID];
			var filePath = item.filePath.replace("/", "\\");

			$("#" + rowID).append( "<div class='col-sm-3 clothing-item'>" +
										"<div class='thumbnail'>" +
	                           				"<img src='" + item.filePath + "'>" +
	                           				"<div class='caption'>" +
	                           					"<p>" + item.name + "</p>" +
				                           		"<button  class='btn btn-default btn-delete-item'>" +
				                        			"<span class='glyphicon glyphicon-trash' aria-hidden='true'></span>" +
	    	                    				"</button>" +    
	    	                    			"</div>" +
	    	                    		"</div>" +
	    	                    	"</div>");

		}

		// populates the thumbnails on page start
		function PopulateWardrobe() {
			var wardrobe = JSON.parse(localStorage.Wardrobe);
			var ids = Object.keys(wardrobe);

			var clothingSetIndex = 0;
			var setID; 

			for (var i = 0; i < ids.length; i++) {

				if ((i != 0) && (i % 4 == 0)) {

					clothingSetIndex++;
					setID = "items-set" + clothingSetIndex;
					$("#wardrobe-inner").append("<div class='item'>" +
													"<div id='" + setID + "' class='row clothing-set'>" +
													"</div>" +
												"</div>");
				}
				else
				{	
					setID = "items-set" + clothingSetIndex;
					if (i == 0) {
						$("#" + setID).empty();
					}								
				}

				DisplayClothingItem(setID, ids[i], wardrobe);
			}
		}

		$(document).ready(function() {

			$('#wardrobe').carousel({
				interval: 10000
			});

			$("#itemFile").fileinput({showCaption: false, allowedPreviewMimeTypes: ['image'], showUpload: false });
			
		});