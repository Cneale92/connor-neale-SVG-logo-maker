const inquirer = require(`inquirer`);
const { writeFile } = require(`fs/promises`);

const SVG = require(`./lib/svg`);
const { Circle, Square, Triangle } = require(`./lib/shapes`);

const checkShapeText = async (input) => {
  if (input.length > 3) {
    return `Please enter text with 3 or less characters`;
  }
  return true;
};

inquirer
  .prompt([
    {
      type: `input`,
      message: `Enter text for the logo. (Must not be more than 3 characters)`,
      name: `shapeText`,
      validate: checkShapeText,
    },
    {
      type: `input`,
      message: `Enter a text color.`,
      name: `textColor`,
    },
    {
      type: `list`,
      message: `Select a shape for the logo`,
      name: `shapeType`,
      choices: [`circle`, `square`, `triangle`],
    },
    {
      type: `input`,
      message: `Enter a shape color`,
      name: `shapeColor`,
    },
  ])

  .then(({ shapeText, textColor, shapeType, shapeColor }) => {
  
    let shapeRender;
    if (shapeType === `circle`) {
      shapeRender = new Circle();
    } else if (shapeType === `square`) {
      shapeRender = new Square();
    } else {
      shapeRender = new Triangle();
    }
    shapeRender.setShapeColor(shapeColor);

    const svg = new SVG();
    svg.setShape(shapeRender);
    svg.shapeTextAndColor(shapeText, textColor);

    writeFile(`logo.svg`, svg.render())
      .then(() => {
        console.log(`Generated logo.svg`);
      })
      .catch((error) => {
        console.log(error), console.log(`An error has been found.`);
      });
  });
