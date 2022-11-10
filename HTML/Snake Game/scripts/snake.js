var Snake_YCases = 20;
var Snake_XCases = 20;
var Snake_Length = 6;

var Snake_Case_Width = 8;
var Snake_Case_Height = 8;
var Snake_Width = Snake_Case_Width * Snake_XCases;
var Snake_Height =  Snake_Case_Height * Snake_YCases;
var Snake_Table;
var Snake_Move_X;
var Snake_Move_Y;
var Snake_Direction;
var timer;
var Start_TM;
var score;
var FruitX;
var FruitY;
var Grandi = false;

document.write('<div id="HEAD" class="Snake_Header" style="width:'+(Snake_Width-1)+'px;">F2 pour commencer.</div>');
var header = document.getElementById("HEAD");

document.write('<div id="SnakeCanvas" class="Snake_Game" style="width:'+Snake_Width+'px;height:'+Snake_Height+'px;"></div>');
var SnakeCanvas = document.getElementById("SnakeCanvas");

document.write('<div id="SnakeControles" class="Snake_Controles" style="width:'+(Snake_Width-1)+'px;">'
			   +'Speed :<BR /><select id="Snake_menu_speed" class="Snake_menu_speed" type="select">'
			   +'<option value="1">1</option>'
			   +'<option value="2">2</option>'
			   +'<option value="3">3</option>'
			   +'<option value="4">4</option>'
			   +'</select>'
			   +'<input id="Snake_bouton_jouer" type="button" class="Snake_bouton_jouer" value="nouveau jeu (F2)" onClick="StartGame();">'
			   +'<input type="button" class="Snake_bouton_aide" value="?" onClick="Ecran_Aide();">'
			   +'</div>');
var menu_speed = document.getElementById("Snake_menu_speed");
var bouton_jouer = document.getElementById("Snake_bouton_jouer");

menu_speed.value = 4;

document.write('<link rel="stylesheet" type="text/css" href="styles/snake.css" >');


var jg = new jsGraphics("SnakeCanvas");


function init() {
	Snake_Table = new Array(Snake_Length);
	Xpos = Math.round(Snake_XCases/2);
	Ypos = Math.round(Snake_YCases/2);
	for (i=0; i<Snake_Table.length; i++) {
		Snake_Table[i] = new Array(2);
		Snake_Table[i][0] = Xpos;
		Snake_Table[i][1] = Ypos;
		Xpos++;
	}
	FruitX = FruitY = - 999999999;
	Snake_Move_X = -1;
	Snake_Move_Y = 0;
	score = 0;
	Snake_Direction = "G";
}


function Draw() {
	jg.clear();
	

	
	for (point=1; point<Snake_Table.length; point ++) {
		if (point % 2 == 0)
			jg.setColor("#006600");
		else
			jg.setColor("#009900");
		x = Snake_Table[point][0] * Snake_Case_Width + 1;
		y = Snake_Table[point][1] * Snake_Case_Height + 1;
		jg.fillRect(x, y, Snake_Case_Width - 2, Snake_Case_Height - 2);
	}

	jg.setColor("#000000");
	x = Snake_Table[0][0] * Snake_Case_Width + 1;
	y = Snake_Table[0][1] * Snake_Case_Height + 1;
	jg.fillEllipse(x, y, Snake_Case_Width - 2, Snake_Case_Height - 2);
	

	jg.setColor("#ff0000");
	x = FruitX * Snake_Case_Width - 1;
	y = FruitY * Snake_Case_Height - 1;
	jg.drawEllipse(x, y, Snake_Case_Width + 1, Snake_Case_Height + 1);

	jg.paint();
}



function Move() {
		DerniereCase = new Array(2);
		DerniereCase[0] = Snake_Table[Snake_Table.length-1][0];
		DerniereCase[1] = Snake_Table[Snake_Table.length-1][1];
		
		for (point=Snake_Table.length-1; point>=1; point--) {
			Snake_Table[point][0] = Snake_Table[point - 1][0];
			Snake_Table[point][1] = Snake_Table[point - 1][1];
		}
		Snake_Table[0][0] = Snake_Table[0][0] + Snake_Move_X;
		Snake_Table[0][1] = Snake_Table[0][1] + Snake_Move_Y;
		
		if (Grandi){
			new_table = new Array(Snake_Table.length + 1);
			for (i=0; i<Snake_Table.length; i++) {
				new_table[i]=new Array(2);
				new_table[i] = Snake_Table[i];
			}
			new_table[new_table.length-1] = new Array(2);
			new_table[new_table.length-1] = DerniereCase;
			Snake_Table = new_table;
			Grandi = false;
		}
		
		checkSnake();
		Draw();
		if (Snake_Move_X == 1)
			Snake_Direction = "D";
		if (Snake_Move_X == -1)
			Snake_Direction = "G";
		if (Snake_Move_Y == 1)
			Snake_Direction = "B";
		if (Snake_Move_Y == -1)
			Snake_Direction = "H";
}


function KeyDown(e){
	var keyCode;
	if (document.all) {
		keyCode = event.keyCode;
	}
	else {
		keyCode = e.which;
	}
	if (keyCode)
		ActionTouche(keyCode);
}


function ActionTouche(touche) {
	switch (touche) {
		case 40: case 83:
			if (Snake_Direction != "H") {
				Snake_Move_X = 0;
				Snake_Move_Y = 1;
			}
			break;
		case 38: case 90:
			if (Snake_Direction != "B") {
				Snake_Move_X = 0;
				Snake_Move_Y = -1;
			}
			break;
		case 37: case 81:
			if (Snake_Direction != "D") {
				Snake_Move_X = -1;
				Snake_Move_Y = 0;
			}
			break;
		case 39: case 68:
			if (Snake_Direction != "G") {
				Snake_Move_X = 1;
				Snake_Move_Y = 0;
			} 
			break;
		case 113 :
			StartGame();
			break;
		default:

			break;
	}
}


function setVitesse() {
	var interval = 1000;
	switch (Snake_Speed) {
		case "1" :
			interval = 800;
			break;
		case "2" :
			interval = 400;
			break;
		case "3" :
			interval = 200;
			break;
		case "4" :
			interval = 100;
			break;
		case "5" :
			interval = 50;
			break;
	}
	timer = setInterval(Move, interval);
}


function checkSnake() {
	result = true;
	

	Xtete = Snake_Table[0][0];
	Ytete = Snake_Table[0][1];
	if (Xtete <= 0 || Xtete >= Snake_XCases - 1 || Ytete <= 0 || Ytete >= Snake_YCases - 1) {
		result = false;
		GameOver();
	}
	

	xyTete = Xtete + "," + Ytete;
	mort_la_queue = false;
	for (i=1; i<Snake_Table.length; i++) {
		xyPoint = Snake_Table[i][0] + "," + Snake_Table[i][1];
		if (xyTete == xyPoint) {
			mort_la_queue = true;
			break;
		}
	}
	if (mort_la_queue) {
		result = false;
		GameOver();
	}
	

	if (xyTete == FruitX + "," + FruitY) {
		NouveauRepas();
		score += 5 * Snake_Speed;
		header.innerHTML = "SCORE: "+GetStringScore();
		Grandi = true;
	}
		
	
	return result;
}


function GameMessage(message) {
	header.innerHTML = message;
}


function GameOver() {
	clearInterval(timer);
	menu_speed.disabled = false;
	GameMessage("<font color='red'>Game Over : "+GetStringScore()+"</font>");
}


function GetStringScore() {
	chaine = "";
	for (i=0; i<6 - score.toString().length; i++) {
		chaine += "0";
	}
	chaine += score;
	return chaine;
}


function NouveauRepas() {

	var OK;
	while (!OK) {
		FruitX = Math.round(Math.random() * (Snake_XCases - 1));
		FruitY = Math.round(Math.random() * (Snake_YCases - 1));
		OK = true;
		for (i=0; i<Snake_Table.length; i++) {
			if (FruitX+","+FruitY == Snake_Table[i][0]+","+Snake_Table[i][1])
				OK = false;
		}
		if (FruitX == 0 || FruitX == Snake_XCases - 1 || FruitY == 0 || FruitY == Snake_YCases - 1)
			OK = false;
	}
}


function StartGame() {
	clearInterval(timer);
	clearTimeout(Start_TM);
	Affiche_Aide = false;
	init();
	NouveauRepas();
	Draw();	
	Snake_Speed = menu_speed.value;
	menu_speed.disabled = true;
	GameMessage("Attrapez les oeufs rouges !")
	Start_TM = setTimeout("setVitesse();", 2000);
}


var Affiche_Aide = false;
function Ecran_Aide() {
	if (!Affiche_Aide) {
		aide_texte = "<strong><font color='darkgreen'>JAVASCRIPT SNAKE</font></strong><br/>"
					+ "Attrapez un maximum d'oeufs avec le serpent sans toucher les paroies et sans que le serpent se morde la queue.<br/>"
					+ "<br/>HAUT : flêche haut ou Z<br/>"
					+ "<strong>BAS</strong> : bas ou S<br/>"
					+ "<strong>GAUCHE</strong> : gauche ou Q<br/>"
					+ "<strong>DROITE</strong> : droite ou D<br/>"
					+ "<strong>NOUVEAU JEU</strong> : F2<BR />"
					
		SnakeCanvas.innerHTML = aide_texte;
		Affiche_Aide = true;
	}
	else {
		SnakeCanvas.innerHTML = "";
		if (Snake_Table != null)
			Draw();
		Affiche_Aide = false;
	}
}

document.onkeydown = KeyDown;




