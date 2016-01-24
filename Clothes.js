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
			// var filePath = item.filePath.replace("/", "\\");

			var id = "item" + itemID;
			$("#" + rowID).append( "<div class='col-sm-3 clothing-item'>" +
										"<div class='thumbnail'>" +
	                           				"<img src='" + item.filePath + "'>" +
	                           				"<div class='caption'>" +
	                           					"<p>" + item.name + "</p>" +
				                           		"<button  id='" + id + "' class='delete-item btn btn-default'>" +
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
					$("#wardrobe-inner").append("<div class='item  clothing-set'>" +
													"<div id='" + setID + "' class='row'>" +
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

		function AddToWardrobe(name, type, filePath) {
			// TODO: might need to make it more efficient
			AddClothingItem(name, type, filePath);

			$("#wardrobe-inner").empty();
			$("#wardrobe-inner").append("<div class='item active clothing-set'>" +
											"<div id='items-set0' class='row'> </div>" +  
										"</div>");
			PopulateWardrobe();
		}

		function DeleteFromWardrobe(itemID) {
			// TODO: might need to make it more efficient
			var wardrobe = JSON.parse(localStorage.Wardrobe);
			delete wardrobe[itemID];
			localStorage.setItem('Wardrobe', JSON.stringify(wardrobe));

			$("#wardrobe-inner").empty();
			$("#wardrobe-inner").append("<div class='item active clothing-set'>" +
											"<div id='items-set0' class='row'> </div>" +  
										"</div>");
			var ids = Object.keys(wardrobe);

			if (ids.length == 0) {
				$('#items-set0').append(
						"<div class='col-sm-3 clothing-item'>" +
							"<div class='thumbnail'>" +
		                        "<img src='C:\\Users\\MarinaT\\Documents\\uoftHacks2016\\placeHolder.jpg'>" +
	                        "</div>" +
	                    "</div>" +
	                    "<div class='col-sm-3 clothing-item'>" +
	                        "<div class='thumbnail'>" +
	                           	"<img src='C:\\Users\\MarinaT\\Documents\\uoftHacks2016\\placeHolder.jpg'>" +
	                        "</div>" +
	                    "</div>" +
	                    "<div class='col-sm-3 clothing-item'>" +
	                    	"<div class='thumbnail'>" +
	                    		"<img src='C:\\Users\\MarinaT\\Documents\\uoftHacks2016\\placeHolder.jpg'>" +
	                    	"</div>" +
	                    "</div>" +
	                    "<div class='col-sm-3 clothing-item'>" +
	                    	"<div class='thumbnail'>" +
	                    		"<img src='C:\\Users\\MarinaT\\Documents\\uoftHacks2016\\placeHolder.jpg'>" +
	                    	"</div>" +
	                    "</div>");
			}
			else {
				PopulateWardrobe();
			}
		}	

		

		$(document).ready(function() {

			$('#wardrobe').carousel({
				interval: 10000
			});

			$("#itemFile").fileinput({showCaption: false, allowedPreviewMimeTypes: ['image'], showUpload: false });	

			PopulateWardrobe();

			$("#wardrobe-inner").on("click", ".delete-item", function(){
				var id = this.id.replace("item", "");
				DeleteFromWardrobe(id);				
			});	


			// Source: http://stackoverflow.com/questions/19183180/how-to-save-an-image-to-localstorage-and-display-it-on-the-next-page
			$("#addItem").click(function(){

				// get name
				var name = $("#itemName").val();

				// get type
				var type = $("#itemType").val();

				if ((!name) || (!type)) {
					alert("either name or type field is empty.");
					return;
				}

				// get file
				// check that a file has been uploaded
				var fileName = $("#itemFile").val();
				if(!fileName) {
					alert("please, upload a file to proceed");
					return;
				}

				// otherwise, the file has been uploaded
				var itemImage = document.getElementById("uploadedItem");

				var canvas = document.createElement("canvas");
				canvas.width = itemImage.width;
    			canvas.height = itemImage.height;

    			var ctx = canvas.getContext("2d");
    			ctx.drawImage(itemImage, 0, 0, itemImage.width, itemImage.height);

    			var dataURL = canvas.toDataURL("image/jpg");

    			// dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
   			

    			AddToWardrobe(name, type, dataURL);

			});

			$("#itemFile").change(function(){
				if(this.files && this.files[0]) {
					var reader = new FileReader();

					reader.onload = function(e) {
						$("#uploaded-images").empty();
						$("#uploaded-images").append("<img id='uploadedItem' width='250' height='250'>");
						document.getElementById('uploadedItem').src = e.target.result;
					};

					reader.readAsDataURL(this.files[0]);
				}
			});	

			

		});