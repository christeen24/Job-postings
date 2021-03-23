import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';

import CompanyDefault from "../assets/images/company_default.svg";

export default function JobPosting() {
  //get data from API
  const url = "https://api.rooster.jobs/core/public/jobs";

  const [jobs, setJobs] = useState([]);
  const [shuffledJobs, setShuffledJobs] = useState([]);

  useEffect(() => {
    getAllJobs();
  }, []);

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

  const shuffleJobs = () => {
    setShuffledJobs(shuffle(jobs));
    setJobs(shuffledJobs);
    console.log(shuffledJobs);
    console.log(jobs);
  };

  return (
    <div class="container my-5 py-5">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-lg-8 mb-5">
          <button
            type="button"
            class="btn btn-dark btn-lg btn-block shuffle-btn"
            onClick={() => shuffleJobs()}
          >
            Shuffle jobs
          </button>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        {jobs.map((job) => (
          <div class="col-12 col-lg-8" key={job.id}>
            <div class="card mb-3 p-2">
              <div class="d-flex flex-row">
                <div class="col-2 col-sm-1">
                  {job.company.logo_url ? (
                    <img src={job.company.logo_url} class="logo" />
                  ) : (
                    <img src={CompanyDefault} class="logo" />
                  )}
                </div>
                <div class="col-10 col-sm-11">
                  <div class="d-sm-flex d-block justify-content-between">
                    <h6 class="job-title">{job.title}</h6>
                    <h6 class="created-date">
                      <i class="fa fa-clock"></i> &nbsp;
                      {moment.utc(job.updated_at).local().startOf('seconds').fromNow()}
                    </h6>
                  </div>
                  <h6 class="company-name">{job.company.name}</h6>
                  <h6 class="category">
                    {job.class} &gt; {job.subclass}
                  </h6>
                  <span class="job-type">
                    <i class="fa fa-briefcase"></i> &nbsp;{job.job_type}
                  </span>
                  &nbsp;&nbsp;
                  <span class="location">
                    <i class="fa fa-globe"></i> &nbsp;{job.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
