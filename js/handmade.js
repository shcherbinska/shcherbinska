var images = {
    1: [
        {   href : 'portfolio/handmade/winter/1.jpg',     
            title : null   },
        {   href : 'portfolio/handmade/winter/2.jpg',     
            title : null   },
        {   href : 'portfolio/handmade/winter/3.jpg',     
            title : null   },
        {   href : 'portfolio/handmade/winter/4.jpg',     
            title : null   },
        {   href : 'portfolio/handmade/winter/5.jpg',     
            title : null   },
        {   href : 'portfolio/handmade/winter/6.jpg',     
            title : null   },
        {   href : 'portfolio/handmade/winter/7.jpg',     
            title : null   }
    ],
    2: [
        {   href: 'portfolio/handmade/music-vinyl/1.jpg',                
            title: null    },
        {   href: 'portfolio/handmade/music-vinyl/2.jpg',       
            title: null    },
        {   href: 'portfolio/handmade/music-vinyl/3.jpg',
            title: null    },
        {   href: 'portfolio/handmade/music-vinyl/4.jpg',       
            title: null    },
        {   href: 'portfolio/handmade/music-vinyl/5.jpg',                
            title: null    }
    ],
    3: [
        {   href : 'portfolio/handmade/super-sailor/1.jpg',               
            title : null   },
        {   href : 'portfolio/handmade/super-sailor/2.jpg',               
            title : null   },
        {   href : 'portfolio/handmade/super-sailor/3.jpg',               
            title : null   },
        {   href : 'portfolio/handmade/super-sailor/4.jpg',               
            title : null   },
        {   href : 'portfolio/handmade/super-sailor/5.jpg',               
            title : null   },
        {   href : 'portfolio/handmade/super-sailor/6.jpg',               
            title : null   },
        {   href : 'portfolio/handmade/super-sailor/7.jpg',               
            title : null   }
    ],
    4: [
        {   href : 'portfolio/handmade/valentines-day/1.jpg',             
            title : null   },
        {   href : 'portfolio/handmade/valentines-day/2.jpg',             
            title : null   },
        {   href : 'portfolio/handmade/valentines-day/3.jpg',             
            title : null   },
        {   href : 'portfolio/handmade/valentines-day/4.jpg',             
            title : null   }
    ]
};

$(".open_fancybox").click(function() {
    $.fancybox.open(images[ $(this).index() + 1], {
        padding : 0
    });
    return false;
});
