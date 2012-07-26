package {

  import flash.display.Sprite;
  import flash.events.MouseEvent;
  
  public class HelloWorld3 extends Sprite {
  
	public function HelloWorld3()
	{
		
      var circle = new Sprite();
      circle.graphics.beginFill(0xFFCC00);
      circle.graphics.drawCircle(0, 0, 40);
      
      var target1 = new Sprite();
      target1.graphics.beginFill(0xCCFF00);
      target1.graphics.drawRect(0, 0, 100, 100);
      target1.name = "target1";
      
      var target2 = new Sprite();
      target2.graphics.beginFill(0xCCFF00);
      target2.graphics.drawRect(0, 200, 100, 100);
      target2.name = "target2";
      
      var target3 = new Sprite();
      target3.graphics.beginFill(0xCCFF00);
		target3.graphics.beginFill(0xffffff, 0);
		target3.graphics.lineStyle(3, 0X999999, 1);
      target3.graphics.drawRect(50, 300, 100, 100);
      target3.name = "target2";

      addChild(target1);
      addChild(target2);
      addChild(target3);
      addChild(circle);
      
      var child = new Sprite();                                                                                         
                                                                                                                        
      /* You should see a squiggly yellow line */                                                                       
      child.graphics.beginFill(0x000000, 0);                                                                           
      child.graphics.lineStyle(5, 0x998800);                                                                              
      child.graphics.moveTo(55, 80);                                                                                    
      child.graphics.lineTo(70, 70);                                                                                    
      child.graphics.lineTo(100, 90);                                                                                   
      child.graphics.lineTo(120, 60);                                                                                   
      child.graphics.lineTo(150, 85);                                                                                   
      child.graphics.lineTo(190, 70);                                                                                   
      child.graphics.endFill();  
      addChild(child);


      circle.addEventListener(MouseEvent.MOUSE_DOWN, mouseDown);
      
      function mouseDown(event):void {
          circle.startDrag();
      }
      circle.addEventListener(MouseEvent.MOUSE_UP, mouseReleased);
      
      function mouseReleased(event):void {
          circle.stopDrag();
          trace(circle.dropTarget.name);
      }
      
    }
    
  }

}
