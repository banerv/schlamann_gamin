function draw() {
  switch (scene) {

    case "game":
      if (levels[level].win) {

        frame = 0;
        scene = "questions";
        dialoguePage = 0;
        showAnswers = false;
        answeredQuestion = false;
        questionY = 400;
        codeEditor.selectedFile = 0;

        if (level >= levels.length) scene = "epilogue";

      } else {

        levels[level].play(keys);

        codeEditor.play(fileNames[level], fileData[level]);

        strokeWeight(6);
        stroke(0);
        line(600, 0, 600, 600);
      }

      break;

    case "intro":

      background(0);

      push();

      if (frame <= 50) {

      } else if (frame > 50 && -2 * (frame - 50) > -8400) {

        translate(-2 * (frame - 50), 0);

      } else {
        translate(-2 * (frame - 50), 0);
        frame = 0;
        scene = "start";
        textOptions = ["talk to mr. schlamann", "options"];
        selectedTextOption = 0;
      }

      for(let i = 0; i < 7; i++) {
        image(deepslate, 1200*i, 0);
      }

      background(0, 10);

      for(let i = 0; i < 6; i++) {
        image(cell, 1200 + 1200*i, 110);
      }

      image(pSprites[0], 1200 + 175, 110 + 155,  240, 240);
      image(pSprites[1], 2400 + 200, 110 + 240);

      push();
      translate(3600 + 100, 110 + 310);
      rotate(90);
      image(pSprites[2], -160, -40, 160, 80);
      pop();

      image(pSprites[3], 4800 + 250, 110 + 120);
      image(pSprites[4], 6000 + 300, 110 + 230, 128, 128);
      image(pSprites[5][Math.floor(frame / 100) % 3], 7200 + 200, 110 + 115);

      for(let i = 0; i < 6; i++) {
        image(bars, 1200 + 1200*i, 110);
      }

      image(schlamann, 9000 - 200, 0);

      pop();

      frame += 4;
      break;

    case "start":
      background(0);

      image(schlamann, 400, 0);

      for (let i = 0; i < textOptions.length; i++) {
        if (i == selectedTextOption) {
          if (frame > 100) {
            strokeWeight(3);
            noFill();
            stroke(255);
            triangle(425, 450 + 50 * i, 425, 430 + 50 * i, 440, 440 + 50 * i);
          }
        }

        textSize(30);
        fill(255, 0.1 * frame * frame);
        strokeWeight(1);
        stroke(0);
        text(textOptions[i], 450, 450 + 50 * i);
      }

      frame++;

      break;

    case "prologue":
      background(0);

      image(schlamann, 400, 0);

      noFill();
      stroke(255);
      strokeWeight(3);

      rect(300, 400, 600, 150);

      dialogueFrag = prologue[dialoguePage].substring(0, frame / 2);

      if (frame / 2 > prologue[dialoguePage].length + 5) {
        triangle(860, 515, 870, 515, 865, 525);
      }

      fill(255);
      noStroke();

      textSize(30);
      text(dialogueFrag, 325, 450);

      frame++;

      break;

    case "questions":
      background(0);

      fill(255);
      stroke(0);
      strokeWeight(1);
      //schlamann placeholder
      image(schlamann, 400, questionY - 400);
      //rect(600, questionY - 150, 50, 100);

      //dialogue box
      noFill();
      stroke(255);
      strokeWeight(3);
      rect(300, questionY, 600, 150);

      //triangle for next page of dialogue
      if (!showAnswers && frame / 2 > questions[level][dialoguePage].length + 5) {
        triangle(860, 515, 870, 515, 865, 525);
      } else if (answeredQuestion && frame / 2 > responses[level][answeredCorrectly][dialoguePage].length + 5) {
        triangle(860, 315, 870, 315, 865, 325);
      }

      //generate question fragment
      if (!answeredQuestion) {
        dialogueFrag = questions[level][dialoguePage].substring(0, frame / 2);

      } else {
        dialogueFrag = responses[level][answeredCorrectly][dialoguePage].substring(0, frame / 2);
      }

      fill(255);
      noStroke();
      textSize(30);

      text(dialogueFrag, 325, questionY + 50);

      if (showAnswers) {
        questionY += 0.1 * (200 - questionY);

        if (Math.abs(200 - questionY) < 1) questionY = 200;

        if (questionY == 200) {

          noFill();
          stroke(255);
          strokeWeight(3);

          rect(300, 400, 600, 150);

          let x = selectedAnswer[1] * 325 + 345;
          let y = selectedAnswer[0] * 60 + 442;

          if (!answeredQuestion) {
            triangle(x - 5, y + 8, x - 5, y - 8, x + 13 - 5, y);
          }

          noStroke();
          fill(255);
          text(answers[level][0], 360, 450);
          text(answers[level][1], 685, 450);
          text(answers[level][2], 360, 510);
          text(answers[level][3], 685, 510);
        }
      }

      frame++;

      break;

    case "epilogue":

      background(0);

      fill(255);
      stroke(0);
      strokeWeight(1);
      //schlamann
      image(schlamann, 400, 0);

      noFill();
      stroke(255);
      strokeWeight(3);

      rect(300, 400, 600, 150);

      dialogueFrag = epilogue[dialoguePage].substring(0, frame / 2);

      if (frame / 2 > epilogue[dialoguePage].length + 5) {
        triangle(860, 515, 870, 515, 865, 525);
      }

      fill(255);
      noStroke();
      textSize(30);
      text(dialogueFrag, 325, 450);

      frame++;

      break;


    case "end":

      if (frame < 430) {
        background(0, 50);

        fill(255);
        stroke(0);
        strokeWeight(1);
        //schlamann
        image(schlamann, 400, 0);

        fill(0);
        stroke(255);
        strokeWeight(3);
        rect(300, 400, 600, 150);

        dialogueFrag = lastLines[dialoguePage].substring(0, frame / 2);

        fill(255);
        noStroke();
        textSize(30);
        text(dialogueFrag, 325, 450);
      }

      if (frame < 60) {

      } else if (frame < 120) {

        dialoguePage = 1;

        strokeWeight(1);
        fill(255, 255, 0);

        if (Math.abs(spritesPos[0][0] - 600) < 5 && Math.abs(spritesPos[0][1] - 300) < 5) {


          ellipse(spritesPos[0][0] + Math.random() * 30, spritesPos[0][1] + Math.random() * 30, 180, 180);

        } else {
          ellipse(spritesPos[0][0], spritesPos[0][1], 180, 180);
        }


        spritesPos[0][0] += 0.3 * (600 - spritesPos[0][0]);
        spritesPos[0][1] += 0.3 * (300 - spritesPos[0][1]);


      } else if (frame < 160) {
        dialoguePage = 1;

        strokeWeight(1);
        fill(255, 255, 0);
        ellipse(spritesPos[0][0], spritesPos[0][1], 180, 180);

        spritesPos[0][0] += 0.3 * (1100 - spritesPos[0][0]);
        spritesPos[0][1] += 0.3 * (800 - spritesPos[0][1]);

      } else if (frame < 210) {

        dialoguePage = 2;

        strokeWeight(1);
        fill(255, 255, 0);

        if (Math.abs(spritesPos[1][0] - 600) < 5 && Math.abs(spritesPos[1][1] - 300) < 5) {


          ellipse(spritesPos[1][0] + Math.random() * 30, spritesPos[1][1] + Math.random() * 30, 180, 180);
        } else {

          ellipse(spritesPos[1][0], spritesPos[1][1], 180, 180);
        }


        spritesPos[1][0] += 0.3 * (600 - spritesPos[1][0]);
        spritesPos[1][1] += 0.3 * (300 - spritesPos[1][1]);

      } else if (frame < 240) {

        dialoguePage = 2;

        strokeWeight(1);
        fill(255, 255, 0);
        ellipse(spritesPos[1][0], spritesPos[1][1], 180, 180);

        spritesPos[1][0] += 0.3 * (600 - spritesPos[1][0]);
        spritesPos[1][1] += 0.3 * (800 - spritesPos[1][1]);

      } else if (frame < 280) {


        dialoguePage = 2;

        strokeWeight(1);
        fill(255, 255, 0);

        if (Math.abs(spritesPos[2][0] - 600) < 5 && Math.abs(spritesPos[2][1] - 300) < 5) {

          ellipse(spritesPos[2][0] + Math.random() * 30, spritesPos[2][1] + Math.random() * 30, 180, 180);
        } else {
          ellipse(spritesPos[2][0], spritesPos[2][1], 180, 180);
        }


        spritesPos[2][0] += 0.3 * (600 - spritesPos[2][0]);
        spritesPos[2][1] += 0.3 * (300 - spritesPos[2][1]);

      } else if (frame < 300) {


        dialoguePage = 2;

        strokeWeight(1);
        fill(255, 255, 0);
        ellipse(spritesPos[2][0], spritesPos[2][1], 180, 180);

        spritesPos[2][0] += 0.3 * (100 - spritesPos[2][0]);
        spritesPos[2][1] += 0.3 * (800 - spritesPos[2][1]);

      } else if (frame < 330) {


        dialoguePage = 2;

        strokeWeight(1);
        fill(255, 255, 0);

        if (Math.abs(spritesPos[3][0] - 600) < 5 && Math.abs(spritesPos[3][1] - 300) < 5) {

          ellipse(spritesPos[3][0] + Math.random() * 30, spritesPos[3][1] + Math.random() * 30, 180, 180);
        } else {
          ellipse(spritesPos[3][0], spritesPos[3][1], 180, 180);
        }


        spritesPos[3][0] += 0.3 * (600 - spritesPos[3][0]);
        spritesPos[3][1] += 0.3 * (300 - spritesPos[3][1]);

      } else if (frame < 350) {

        dialoguePage = 2;

        strokeWeight(1);
        fill(255, 255, 0);
        ellipse(spritesPos[3][0], spritesPos[3][1], 180, 180);

        spritesPos[3][0] += 0.3 * (100 - spritesPos[3][0]);
        spritesPos[3][1] += 0.3 * (-200 - spritesPos[3][1]);

      } else if (frame < 370) {



        dialoguePage = 2;

        strokeWeight(1);
        fill(255, 255, 0);

        if (Math.abs(spritesPos[4][0] - 600) < 5 && Math.abs(spritesPos[4][1] - 300) < 5) {

          ellipse(spritesPos[4][0] + Math.random() * 30, spritesPos[4][1] + Math.random() * 30, 180, 180);
        } else {
          ellipse(spritesPos[4][0], spritesPos[4][1], 180, 180);
        }


        spritesPos[4][0] += 0.3 * (600 - spritesPos[4][0]);
        spritesPos[4][1] += 0.3 * (300 - spritesPos[4][1]);

      } else if (frame < 390) {


        dialoguePage = 2;

        strokeWeight(1);
        fill(255, 255, 0);
        ellipse(spritesPos[4][0], spritesPos[4][1], 180, 180);

        spritesPos[4][0] += 0.3 * (600 - spritesPos[4][0]);
        spritesPos[4][1] += 0.3 * (-200 - spritesPos[4][1]);

      } else if (frame < 410) {



        dialoguePage = 2;

        strokeWeight(1);
        fill(255, 255, 0);

        if (Math.abs(spritesPos[5][0] - 600) < 5 && Math.abs(spritesPos[5][1] - 300) < 5) {

          ellipse(spritesPos[5][0] + Math.random() * 30, spritesPos[5][1] + Math.random() * 30, 180, 180);
        } else {
          ellipse(spritesPos[5][0], spritesPos[5][1], 180, 180);
        }


        spritesPos[5][0] += 0.3 * (600 - spritesPos[5][0]);
        spritesPos[5][1] += 0.3 * (300 - spritesPos[5][1]);

      } else if (frame < 430) {


        dialoguePage = 2;

        strokeWeight(1);
        fill(255, 255, 0);
        ellipse(spritesPos[5][0], spritesPos[5][1], 180, 180);

        spritesPos[5][0] += 0.3 * (1100 - spritesPos[5][0]);
        spritesPos[5][1] += 0.3 * (-200 - spritesPos[5][1]);

      } else if (frame < 600) {

        background(255);

      } else if (frame < 1000) {

        background(0, 100);

      } else if (frame == 1000) {
        frame = 0;
        scene = "credits";
      }


      frame++;


      break;

    case "credits":

      background(0);
      fill(255);
      textSize(30);

      if (frame < 1300 + 150) {

        push();

        translate(0, -frame * 2);

        textAlign(CENTER);

        text("directed & coded by Vani banerjee", 600, 600);

        text("problems by Vani banerjee, elyssa chandler, maria jiao & alex yang", 600, 1100);

        text("web design by elyssa chandler", 600, 1400);

        text("art by maria jiao & Vani banerjee", 600, 1700);

        text("story by elyssa chandler, maria jiao, & Vani banerjee", 600, 2000);

        text("minigames by Vani banerjee & alex yang", 600, 2300);

        text("animations by maria jiao & Vani banerjee", 600, 2600);
        pop();

      } else {
        textAlign(CENTER);
        textSize(30);
        text("thank you for playing our game!", width / 2, height / 2);
        textSize(15);
        text("- the schlamann gamin team", width / 2 + 55, height / 2 + 20);
      }

      frame++;

      break;

    case "settings":
      background(0);

      text("talk to him", width / 2, height / 2);

      for (let i = 0; i < textOptions.length; i++) {
        if (i == selectedTextOption) {
          if (frame > 100) {
            triangle(425, 450 + 50 * i, 425, 430 + 50 * i, 440, 440 + 50 * i);
          }
        }

        text(textOptions[i], 450, 450 + 50 * i);
      }

      break;
  }
}
