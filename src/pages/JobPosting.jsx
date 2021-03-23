import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';

import CompanyDefault from "../assets/images/company_default.svg";

export default function JobPosting() {
  //get data from API
  const url = "https://api.rooster.jobs/core/public/jobs";

  const [jobs, setJobs] = useState([]);
  const [shuffledJobs, setShuffledJobs] = useState([]);

  // initial render
  useEffect(() => {
    getAllJobs();
  }, []);

  // get all the jobs from API
  const getAllJobs = () => {
    axios
      .get(`${url}`)
      .then((response) => {
        console.log(response);
        const allJobs = response.data.body.results;
        setJobs(allJobs);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // shuffle function
  const shuffle = (arr) => {
    var i, j, temp;
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

  // shuffle onclick function
  const shuffleJobs = () => {
    setShuffledJobs(shuffle(jobs));
    setJobs(shuffledJobs);
    console.log(shuffledJobs);
    console.log(jobs);
  };

  return (
    // start of body
    <div class="container my-5 py-5">
      {/* Start of shuffle button */}
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-lg-8 mb-5">
          <button
            type="button"
            class="btn btn-dark btn-lg btn-block"
            onClick={() => shuffleJobs()}
          >
            Shuffle jobs
          </button>
        </div>
      </div>
      {/* End of shuffle button */}
      {/* start of job list */}
      <div class="row d-flex justify-content-center">
        {/* map jobs array */}
        {jobs.map((job) => (
          // start of job div
          <div class="col-12 col-lg-8" key={job.id}>
            <div class="card mb-3 p-2">
              <div class="d-flex flex-row">
                {/* start of company logo */}
                <div class="col-2 col-sm-1">
                  {job.company.logo_url ? (
                    <img src={job.company.logo_url} class="logo" />
                  ) : (
                    <img src={CompanyDefault} class="logo" />
                  )}
                </div>
                {/* end of company logo */}
                {/* start of job details */}
                <div class="col-10 col-sm-11">
                  {/* start of job title and created date */}
                  <div class="d-sm-flex d-block justify-content-between">
                    <h6 class="job-title">{job.title}</h6>
                    <h6 class="created-date">
                      <i class="fa fa-clock"></i> &nbsp;
                      {moment.utc(job.updated_at).local().startOf('seconds').fromNow()}
                    </h6>
                  </div>
                  {/* end of job title and created date */}
                  {/* start of company name */}
                  <h6 class="company-name">{job.company.name}</h6>
                  {/* end of company name */}
                  {/* start of job category */}
                  <h6 class="category">
                    {job.class} &gt; {job.subclass}
                  </h6>
                  {/* end of job category */}
                  {/* start of job type */}
                  <span class="job-type">
                    <i class="fa fa-briefcase"></i> &nbsp;{job.job_type}
                  </span>
                  {/* end of job type */}
                  &nbsp;&nbsp;
                  {/* start of job location */}
                  <span class="location">
                    <i class="fa fa-globe"></i> &nbsp;{job.location}
                  </span>
                  {/* end of job location */}
                </div>
                {/* end of job etails */}
              </div>
            </div>
          </div>
          // end of job div
        ))}
      </div>
      {/* end of job list */}
    </div>
    // end of body
  );
}
