const timelineNodes = document.querySelectorAll(".timeline li")
const contentSections = document.querySelectorAll(".content-section")

/*** UPDATE TIMELINE AS THE USER SCROLLS ***/
window.addEventListener("scroll", () => {
  //reset active status on all timeline elements
  timelineNodes.forEach(node => {
    if (node.classList.contains("active")) {
      node.classList.remove("active")
    }
  })

  //get the user's current scroll position
  let scrollPos = window.scrollY;
  contentSections.forEach(section => {
    //get the vertical position (start and end) of the elements
    let sectionStart = section.offsetTop
    let sectionEnd = section.offsetTop + section.scrollHeight
    //if the user is currently scrolling through that element
    if (scrollPos >= sectionStart && scrollPos <= sectionEnd) {
      const year = section.classList[1].slice(8, 12)
      const matchingTimelineNode = document.querySelector(`.timeline-${year}`)
      matchingTimelineNode.classList.add("active") //activate related timeline node
    }
  })
})

timelineNodes.forEach(node => {
  node.addEventListener("click", (event) => {

    let target;
    if (event.target.nodeName === "LI") {
      target = event.target;
    } else if (event.target.parentNode.nodeName === "LI") {
      target = event.target.parentNode;
    } else if (event.target.parentNode.parentNode.nodeName === "LI") {
      target = event.target.parentNode.parentNode;
    }

    const year = target.classList[0].slice(9, 13)
    const matchingSection = document.querySelector(`.content-${year}`)
    const newScroll = matchingSection.offsetTop
    window.scrollTo(0, newScroll + 1) //might be upgraded with smooth scroll
    console.log(year)
  })
})

window.addEventListener("DOMContentLoaded", () => {
  distributeTimelineItems()
})


window.addEventListener("resize", () => {
  distributeTimelineItems()
})



/*** PROGRAMMATICALLY SET TIMELINE ITEM GAPS ***/
function distributeTimelineItems() {
  const timelineUL = document.querySelector(".timeline ul")
  const baseHeight = timelineUL.offsetHeight;
  let listItemHeights = 0;
  //get all the heights
  const timelineItems = document.querySelectorAll(".timeline li")
  timelineItems.forEach(listItem => {
    listItemHeights += listItem.offsetHeight;
  })

  const spaceToDistribute = baseHeight - listItemHeights;
  const baseGap = spaceToDistribute / 60;

  //loop through each timeline item
  for (let i = 0; i < timelineItems.length - 1; i++) {
    let thisNode = timelineItems[i];
    let nextNode = timelineItems[i + 1];
    let thisYear = getTimelineYear(thisNode);
    let nextYear = getTimelineYear(nextNode);

    let yearGap = nextYear - thisYear;

    let margin = yearGap * baseGap;

    //set the margin on the element
    thisNode.style.marginBottom = `${margin}px`;

  }

  function getTimelineYear(timelineItems) {
    let year = timelineItems.querySelector(".date").innerText;
    return parseInt(year)
  }
}


