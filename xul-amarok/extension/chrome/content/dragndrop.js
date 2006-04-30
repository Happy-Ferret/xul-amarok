


var collectionObserver = {
    
    onDragStart: function (evt , transferData, action){
		
		var tree = evt.target.parentNode;
		if (!tree.view) return false;

		var start = new Object();
		var end = new Object();
		var numRanges = tree.view.selection.getRangeCount();

		transferData.data= new TransferData();
		var items = new Array();
		
		for (var t=0; t<numRanges; t++){
			  tree.view.selection.getRangeAt(t,start,end);
			  for (var v=start.value; v<=end.value; v++){
			  	  items.push(v);
			  }
		}

		if (items.length == 0) return false;
		transferData.data.addDataForFlavour('amarok/browseritems',items);
		return true;
	}
};



var playlistObserver = {
	
	getSupportedFlavours : function () {
	    var flavours = new FlavourSet();
	    flavours.appendFlavour('amarok/browseritems');
	    return flavours;
	  },
	  
	onDragOver: function (evt,flavour,session){},
	  
	onDrop: function (evt,dropdata,session){
		
		if (dropdata.data != "") {
		
			var items = dropdata.data.split(',');
			var tracks=new Array();
			var albums=new Array();
			var artists=new Array();
			
			for (var i=0; i<items.length; i++) {
			
				var v = items[i];
				
				var level = collectionView.getLevel(v);
			  	if (level == 2)  {
					var url = collectionView.visibleData[v][4];
					tracks.push(url);
				}
		    	if (level == 1)  {
					var album = collectionView.visibleData[v][0];
					albums.push(album);
				}	
				if (level == 0)  {
					var artist = collectionView.visibleData[v][0];
					artists.push(artist);
				}
			}
			
			if (tracks.length)  addTracks(tracks);
			if (albums.length)  addAlbums(albums);
			if (artists.length) addArtists(artists);
			
		}
		
	}

}


