const form = document.querySelector('form');
const name = document.querySelector('input[data-region-name]');
const avgAge = document.querySelector('input[data-avg-age]');
const avgIncome = document.querySelector('input[data-avg-daily-income-in-usd]');
const avgPopulation = document.querySelector('input[data-avg-daily-income-population]');
const population = document.querySelector('input[data-population]');
const reportedCases = document.querySelector('input[data-reported-cases]');
const totalHospitalBeds = document.querySelector('input[data-total-hospital-beds]');
const periodType = document.querySelector('select[data-period-type]');
const timeElapsed = document.querySelector('input[data-time-to-elapse]');
const estimate = document.getElementById('estimate');
const tag = document.getElementById('tag');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = {
    region: {
      name: name.value,
      avgAge: Number(avgAge.value),
      avgDailyIncomeInUSD: Number(avgIncome.value),
      avgDailyIncomePopulation: avgPopulation.value / 100
    },
    periodType: periodType.value,
    timeToElapse: Number(timeElapsed.value),
    reportedCases: Number(reportedCases.value),
    population: Number(population.value),
    totalHospitalBeds: Number(totalHospitalBeds.value)
  };

  const response = await fetch('https://murmuring-thicket-28660.herokuapp.com/api/v1/on-covid-19', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const finalResponse = await response.json();
  const impactData = finalResponse.impact;
  const severeImpactData = finalResponse.severeImpact;

  const values = [
    {
      title: 'Impact Estimate',
      currentlyInfected: impactData.currentlyInfected,
      infectionsByRequestedTime: impactData.infectionsByRequestedTime,
      severeCasesByRequestedTime: impactData.severeCasesByRequestedTime,
      hospitalBedsByRequestedTime: impactData.hospitalBedsByRequestedTime,
      casesForICUByRequestedTime: impactData.casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: impactData.casesForVentilatorsByRequestedTime,
      dollarsInFlight: impactData.dollarsInFlight
    },
    {
      title: 'Severe Estimate',
      currentlyInfected: severeImpactData.currentlyInfected,
      infectionsByRequestedTime: severeImpactData.infectionsByRequestedTime,
      severeCasesByRequestedTime: severeImpactData.severeCasesByRequestedTime,
      hospitalBedsByRequestedTime: severeImpactData.hospitalBedsByRequestedTime,
      casesForICUByRequestedTime: severeImpactData.casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: severeImpactData.casesForVentilatorsByRequestedTime,
      dollarsInFlight: severeImpactData.dollarsInFlight
    }
  ];

  const resultCard = (data) => (
    `<div class="card">
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
            <ul class="list-group">
              <li class="list-group-item">Currently Infected <br> <span id="" >${data.currentlyInfected}</span></li>
              <li class="list-group-item">Infections By Requested Time <br> <span id="two" >${data.infectionsByRequestedTime}</span></li>
              <li class="list-group-item">Severe Cases At Requested Time<br> <span id="three" >${data.severeCasesByRequestedTime}</span></li>
              <li class="list-group-item">Hospital Beds At Requested Time <br> <span id="four" >${data.hospitalBedsByRequestedTime}</span></li>
              <li class="list-group-item">Cases For ICU <br> <span id="five">${data.casesForICUByRequestedTime}</span> </li>
              <li class="list-group-item">Cases For Ventilators <br> <span id="six" >${data.casesForVentilatorsByRequestedTime}</span></li>
              <li class="list-group-item">Dollars In Flight <br> <span id="seven" >${data.dollarsInFlight}</span></li>
            </ul>
          </div>
        </div>
      </div>`
  );

  tag.textContent = 'Your Estimate';
  estimate.innerHTML = values.map((item) => resultCard(item));
  
});
