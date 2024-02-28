// Source for sprite animations: https://youtu.be/1bj7g6sXit8?feature=shared


window.addEventListener('load', ()=> {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 380;
    canvas.height = 648;


// Positions the sprite including size
class Warrior {
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.image = document.getElementById('warrior');
        this.spriteWidth = 128;
        this.spriteHeight = 64.15;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.scale = 2;
        this.x = this.canvasWidth/2 - this.width * this.scale/2;
        this.y = this.canvasHeight/2 - this.height * this.scale/2;
        this.minFrame = 0;  
        this.maxFrame = 15; 
        this.frame = 0;
        this.frameX = 1;
        this.frameY = 3;
};

// Used .drawimage to draw Sprite
    draw(context){
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width * this.scale, this.height * this.scale)
    }

// Animates Sprite
    update(){
        this.frame = this.frame < this.maxFrame ? this.frame + 1 : this.minFrame;
        this.frameX = this.frame % 2;
        this.frameY = Math.floor(this.frame /4);
    }

// Seperates event for each animation move
    setAnimation(newMinFrame, newMaxFrame){
            this.minFrame = newMinFrame;
            this.maxFrame = newMaxFrame;
            this.frame = this.minFrame;
        }
    }


    const warrior = new Warrior(canvas.width, canvas.height);

// Runs function
    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        warrior.draw(ctx);
        warrior.update();
        requestAnimationFrame(animate);
    }
    animate();
});


// Done by Friday
// A lot more story progress or Sprite starting to work // DONE


// Each object has its own image and can change when you change objects     // DONE
// Progress the story more until almost finshed                             // Finishing story 
// Start working on sprites and animate them possibly give action in text   // DONE
// Make a attack function for sprite    // Function with a button that will change image and anaimation frames



// Video that helped me with the text //https://youtu.be/R1S_NhKkvGA?si=WnilnmECwGJx94Nu



// Declaring Variables
const textElement = document.getElementById('text');
const linkElement = document.getElementById('linkDiv');

const lostRuin = document.getElementById('theLost')
const grave = document.getElementById('theGrave')
const nightRuin = document.getElementById('nightRuins')
const imgWarrior = this.document.getElementById('warrior')
const linkDiv = document.getElementById('link-div')


const attack1 = 0; // Change later
const attack2 = 0 // Change later, it's on the same sprite sheet named attacks 
const dodge = 0; // Change later 


let state = {}
let change = []


// Start game
function startGame() {
    state = {}
    showTextNode(1) // Default TextNode on Starting Game
}


// Displays the current option  
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    
    textElement.innerText = textNode.text;
    while (linkElement.firstChild) {
        linkElement.removeChild(linkElement.firstChild)
    }

    // Loops through options
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const a = document.createElement('a')
            a.innerText = option.text
            a.classList.add('link')
            a.classList.add('text-decoration-none')
            a.addEventListener('click', () => selectOption(option))
            linkElement.appendChild(a)
        }
    })

    
    lostRuin.setAttribute('src', textNode.image)
    lostRuin.setAttribute('alt', textNode.alt )
    nightRuin.setAttribute('src', textNode.image)
};



// Shows options based on state
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)  // If required state is not present then the option will not show unless you have that state
}


// Every time you select a option
function selectOption(option) {
    
    const nextTextNodeId = option.nextText
    
    if (nextTextNodeId <= 0) {
        return startGame()
    }

    const runFnc =(option)=> {

        console.log(option)
        if (nextTextNodeId == 2.5) {
            imgWarrior.setAttribute('src', textNodes[1].options[0].image)
            console.log('This statement works')
        } 
        else if (nextTextNodeId == 7) {
            imgWarrior.setAttribute('src', textNodes[12].options[0].image)
        } 
        else {
            imgWarrior.setAttribute('src', textNodes[0].options[0].image)
        } 
    }

    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)

    runFnc(option);
};





const myAudio =()=> {
    // Might add audio later 
}




const textNodes = [
    {
        id: 1,
        text: "Welcome to \"Evils of Sodom\" A newly designed text based rpg as of \n 2-1-2024 \n friendly reminder, choose your choices wisely \n\n\n\n (A distant voice) He's woken up after ???? years.... (the voice fades) \n\n You....you can't remember who you are or anything about you, all you have is a sword beside you. In the distance you see what appears to be ruins. ",
        options: [
            {
                text: '(1) Sleep further',
                image: "/items/mainCharacter/Sprites/2dknight/idle.png",
                nextText: 2
            },
            {
                text: '(2) Go towards fallen ruins',
                state: {walk: true},
                nextText: 2.5
            },
            {
                text: '(3) Look for populace',
                nextText: 3
            }
        ],
        image: "/backgrounds/lost.gif",
        alt: "Lost ruins gif image",
    },

    {
        id: 2.5,
        text: "You run towards your destination whilst passing by an advance looking city. You obviously don't remember anything like this after being alseep for so long. \n\n (Can I survive in this place???) \n\n This tought alone makes you question do you even truly remember how to wield your sword.",
        options: [
            {
                text: '(1) Onward',
                image: "/items/mainCharacter/Sprites/2dknight/Run.png",
                nextText: 3
            }
        ],
        image: "/backgrounds/advanceTown.gif",
        alt: "Forest gif image"
    },

    {
        id: 2,
        text: "You fall alseep once more but this time you know you won't wake up. Instead you find yourself in a lake of fire surrounded by those like you and your sure this isn't a dream \n\n\"You lived a pitiful, lazy life and died\" \n\n\n(ENDING 1 Sleepy)",
        options: [
            {
                text: "(1) Restart",
                nextText: -1
                // requiredState: (currentState) => currentState.Death,
                // setState: { Death: true},
            }
        ],
        image: "/backgrounds/Grave.gif",
        alt: "Graveyard gif image"
    },


    {
        id: 3,
        text: "You venture forth but in your search as if something is off. You can see a small cart in the distance being pulled by what appears to be a person. There is also a forest next to you but you hear a howl and you feel a strong wave of animosity towards it.",
        options: [
            {
                text: "(1) Continue on your journey",
                nextText: 4
            },
            {
                text: "(2) Appraoch Person",
                nextText: 5
            },
            {
                text: "(3) Go in Forest",
                nextText: 6
            },
        ],
        image: "/backgrounds/nightRuins.gif",
        alt: "Night ruins gif image"
    },


    {
        id: "Dragon",
        text: "You somehow ended up alone fighting a dragon?",
        options: [
                {
                    text: "(2) Approach Dragon",
                    nextText: 0 //Change later
                },
                {
                    text: "(3) Fight Dragon",
                    nextText: 0 //Change later
                }
        ],
        image: "/backgrounds/dragon1.gif",
        alt: "Dragon gif image"
    },


    {
        id: 4,
        text: "As you get closer to the ruins you are stopped in your tracks by a dragon flying an towering over you. You know you can't win this fight \n(right now at least). \n\n\"You decide to turn back\"",
        options: [
            {
                text: "(1) Head back",
                nextText: 3
            }
        ],
        image: "/backgrounds/dragon1.gif",
        alt: "Dragon gif image"
    },


    {
        id: 5,
        text: "You approach the person. He greets you \"Greetings, what do you seek stranger? Perhaps your lost like the rest of us.\" \n\n \"You stare silently\" \n\n (You resume your task)" ,
        options: [
            {
                text: "(1) Walk towards the stranger",
                nextText: 5.1
            },
            // {
            //     text: "(2) Attack the stranger" //Attack function?
            // },
            {
                text: "(2) Leave",
                nextText: 100
            }
        ],
        image: "/backgrounds/samuraiResting.jpg",
        alt: "samurai gif image"
    },


    {
        id: 5.1,
        text: "As you approach the stranger, you see that he is adjusting his blade, so you come to a halt. He giggles \"Don't worry I can no longer fight, my days are over all because of that damned accursed war\"\n ",
        options: [
            {
                text: "(1) War?....What War?",
                nextText: 5.2
            },
            {
                text: "(2) Why did you fight in the war?",
                nextText: 5.3
            }
        ],
        image: "/backgrounds/samuraiResting.jpg",
        alt: "samurai gif image"
    },

    {
        id: 5.2,
        text: "You are unaware of the war?....After a millennium, some claim it is still going on strong. Everything that the inhabitants of our territory might regard as life was lost in that battle. Before you say that's typical of a war, consider this: it took crops, houses, mothers, fathers, children, and hope. And it happened on a scale you could never have imagined and beware of the capital they are not to be trusted. \n\nAdditionally, a prophecy states that in the far future, Kingdom would rise against Kingdom and nation will rise against nation.",
        options: [
            {
                text: "\n(1) Why can't the war end?",
                nextText: 5.4
            },
            {
                text: "(2) Continue on with your journey",
                nextText: 7
            }
        ],
        image: "/backgrounds/samuraiResting.jpg",
        alt: "samurai gif image"
    },

    {
        id: 5.3,
        text: "You ask, \"Why did I fight in the war?\"...fought, heh. Although I was general, it took everything away from me.....my wife, my children. Even after everything I did, my nation, the capital betrayed me and abandoned me. Since our region was being overrun and those who did nothing killed while attempting to escape, we were forced to fight. In an attempt to protect my family, I enlisted in the military, but it was still insufficient. ",
        options: [
            {
                text: "(1) Why can't the war end?",
                nextText: 5.4
            },
            {
                text: "(2) Continue on with your journey",
                nextText: 7
            }
        ],
        image: "/backgrounds/samuraiResting.jpg",
        alt: "samurai gif image"
    },

    {
        id: 5.4,
        text: "It won't end because of the tyrants continue to advocate for war, it won't end...Many fine people will perish as long as they live, simply because it satisfies their vile cravings. I am Jun'ad; please keep this in mind. For my people, it will be of great use to you in the future. farewell, warrior",
        options: [
            {
                text: "(1) leave",
                nextText: 100
            }
        ],
        image: "/backgrounds/samuraiResting.jpg",
        alt: "samurai gif image"
    },


    {
        id: 7,
        text: "After discovering that the capital cannot be trusted, you resolve to pursue it. If you want to know how and why you woke up, that might be your best option. \n (ENDING 3 Unfulfilled Destiny)",
        options: [
            // {
            //     text:"(1) onward",
            //     image: "/items/mainCharacter/Sprites/2dknight/Run.png",
            //     nextText: -1
            // },
            {
                text: "(1) continue",
                nextText: 100
            },
        ],
        image: "/backgrounds/wanderImg.gif",
        alt: "Traveling pixel gif image"
    },

    {
        id: 100,
        text: "Congrats you beat my project. I wanted to do more on the story but I had to keep it short. I am kinda poud of this project not fully mainly because I wanted to add attack, dodge, and flee buttons for attacking. I'll come back and finish one day don't worry but other than that I hoped you enjoyed this short adventure!\n\n\n (ENDING 4 Github)",
        options: [
            {
                text: "(1) restart",
                nextText: -1
            }
        ],
        image: "/backgrounds/waterfallTown.gif",
        alt: "Waterfall village gif image" 
    },


    {
        id: 6,
        text: "You enter the forest \n (voice) \"What brings a human here....?\" \n Even you know you shouldn't be here....... Now let me offer you some advice.\n\n",
        options: [
            {
                text: "(1) Listen to the ???",
                nextText: 'beastText1'
            },
        ], 
        image: "/backgrounds/forestMonster.gif",
        alt: "Forest Monster gif image"
    },

    {
        id: 'beastText1', 
        text: "We have our secrets and you have yours. Why is your kind so eager to produce this futile attempt to change. It is in your nature to do both good and bad. it is in your interest to leave and human..... Shall you falter in your near future you \"WILL SEE THE END\".",
        options: [
            {
                text: "(1) Quickly leave the forest",
                nextText: 'beast3'
            }, 
        ],
        image: "/backgrounds/forestMonster.gif",
        alt: "Forest Monster gif image"
    },

    {
        id: 'beast3',
        text: "You venture forth but in your search you feel as if your purpose is lost. You can see a small cart in the distance being pulled by what appears to be a person. There is also a forest next to you but you hear a howl and you feel a strong wave of animosity towards it.",
        options: [
            {
                text: "(1) Continue on your journey",
                nextText: 4
            },
            {
                text: "(2) Appraoch Person",
                nextText: 5
            },
            {
                text: "(3) Go in Forest",
                nextText: 'beastWarning'
            },
        ],
        image: "/backgrounds/nightRuins.gif",
        alt: "Night ruins gif image"
    },
    {
        id: 'beastWarning',
        text: "HUMAN......Why......are you here once more.....maybe you seek death.",
        options: [
            {
                text: "(1) ......",
                nextText: 'silence'
            }
        ],
        image: "/backgrounds/theDeath.jpg",
        alt: "Forest Monster gif image"
    },
    {
        id: 'silence',
        text: "Killing you would bring no pleasure. You will see how your actions have doomed you this day. Farewell Mortal. \n\n\n (ENDING 2 CURSED)",
        options: [
            {
                text: "(1) continue",
                nextText: 100
            }
        ],
        image: "/backgrounds/theDeath.jpg",
        alt: "Forest Monster gif image"
    }
]

startGame();

