(function($, window, Spin){
  Spin.behaviors.spin = {
    name : "spin",
    mousedown  : function(e){
      var $this = $(this), data = $this.data('spritespin');
      Spin.updateInput(e, data);
      data.onDrag = true;
      return false; 
    },
    mousemove  : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      if (data.onDrag){
        // perform default drag behavior
        Spin.updateInput(e, data);
        var d = data.dX / data.width;
        var dFrame = d * data.frames * data.sense;
        var frame = Math.round(data.clickframe + dFrame);
        
        api.update.apply($this, [frame]);     // update to frame
        api.animate.apply($this, [false]);    // stop animation
        
        // calculate framtetime for spinwheel
        if (data.ddX !== 0){
          d = data.ddX / data.width;
          dFrame = d * data.frames * data.sense;
          data.frameTime = (data.frameTime / dFrame);
          data.reverse = (data.ddX < 0);
        }
      }
      return false;  
    },
    mouseup    : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      if (data.onDrag){
        data.onDrag = false;
        $this.spritespin("animate", true);
      }
      return false; 
    },
  
    mouseenter : function(e){ return false; },
    mouseover  : function(e){ return false; },
    mouseleave : function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      if (data.onDrag){
        data.onDrag = false;
        $this.spritespin("animate", $this.spritespin("animate"));
      }
      return false; 
    },
    dblclick   : function(e){ 
      $(this).spritespin("animate", "toggle");
      return false; 
    },
    onFrame : function(e, data){
      if (data.ddX !== 0){
        data.frameTime = data.frameTime + 1;
      
        $(this).spritespin("animate", false);
        if (data.frameTime < 62){
          $(this).spritespin("animate", true);
        }  
      } else {
        $(this).spritespin("animate", false);
      }
      return false; 
    }
  };
})(jQuery, window, window.SpriteSpin);