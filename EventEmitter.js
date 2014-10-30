function EventEmitter()
{
  this.callbacks = new Array();	
}

EventEmitter.prototype =	
{
	on:function(event,fn)				// Ajoute un event sur lequel reagir
	{
		if(!this.callbacks.hasOwnProperty(event))
			this.callbacks[event] = new Array(new Array(fn, -1));
		else 
			this.callbacks[event].push(new Array(fn, -1));
	},
	
	times:function(event, nb, fn)
	{
		if(!this.callbacks.hasOwnProperty(event))
			this.callbacks[event] = new Array(new Array(fn, nb));
		else 
			this.callbacks[event].push(new Array(fn, nb));
	},
	
	once:function(event, fn)
	{
		this.times(event, 1, fn);
	},
	
	emit:function(event)					// Affecte les fonctions aux arguments
	{
		if (!this.callbacks.hasOwnProperty(event))
			return;
		
		var args = Array.prototype.slice.call(arguments, 1);
		this.callbacks[event].forEach(function(func)
		{ 
			
			
			if(func[1] == 0)
			{
				
			}
			else if(func[1] > 0)
			{
				if(typeof func[0] === 'function')
				{
					func[0].apply(null, args);
					func[1]--;
				}
			}
			else if(func[1] < 0)
			{
				if(typeof func[0] === 'function')
				{
					func[0].apply(null, args);
				}
			}
		})
	},
	
	off:function(event, fn)
	{
		if(arguments.length == 2)
		{
			var i = 0;
			this.callbacks[event].forEach(function(func)
			{ 
				if(func[0] == fn)
				{
					func[1] = 0;
				}
			})
		}
		if(arguments.length == 1)
			if(this.callbacks.hasOwnProperty(event))
				delete this.callbacks[event];
		if(arguments.length == 0)
			this.callbacks = {};
	}
};

exports.em = new EventEmitter();

/*

var fn = console.log.bind(console);
var fn2 = console.log.bind(console);
var em = new EventEmitter();


em.on("event1", fn);
em.on("event2", fn);
em.emit("event1", 1);
em.emit("event2", 2);
em.off();
em.emit("event1", 1);
em.emit("event2", 2);

console.log("=============");	

em.on("event1", fn)
em.on("event2", fn)
em.emit("event1", 1)
em.emit("event2", 2)
em.off("event1", fn)
em.emit("event1", 1)
em.emit("event2", 2)

//	Nothing	should	happen	when	calling	
//	.emit("event1",	..)	after	.off("event1")
//	Should	print:	1	2	2

console.log("=============");

em.once("event",function(){console.log("Should only be printed once");})
em.emit("event")
em.emit("event");

console.log("=============");

em.times("event1", 2, fn)
em.emit("event1", "hello should be print")
em.emit("event1", "world should be print")
em.emit("event1", "SHOULD NOT BE PRINTED");

//	fn	should	only	be	called	2	times.
*/