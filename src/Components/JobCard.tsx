import { Link } from "react-router-dom";
import { MapPin, Clock, Building2, Bookmark } from "lucide-react";
import { Badge } from "@/Components/badge";
import { Button } from "@/Components/button";
import { motion } from "framer-motion";

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  category: string;
  postedAt: string;
  description: string;
  benefits: string[];
  experience?: string;
  skills?: string[];
}

const JobCard = ({ job, index = 0 }: { job: Job; index?: number }) => (
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.05, duration: 0.4 }}
  className="h-full"
>
  <div className="flex h-full rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md sm:p-6">
    <div className="flex w-full gap-3 sm:gap-4">
      {/* Icon */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:h-12 sm:w-12">
        <Building2 className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
      </div>

      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3 className="line-clamp-2 font-display text-base font-semibold leading-6 text-card-foreground sm:text-lg">
              {job.title}
            </h3>

            <p className="truncate text-sm text-muted-foreground">
              {job.company}
            </p>
          </div>

          <div className="shrink-0 sm:text-right">
            <p className="font-semibold text-primary text-sm sm:text-base">
              {job.salary}
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              ~{job.postedAt}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs sm:text-sm">
          <Badge variant="outline" className="gap-1 font-normal">
            <MapPin className="h-3 w-3" />
            <span className="truncate max-w-[120px] sm:max-w-none">
              {job.location}
            </span>
          </Badge>

          <Badge variant="outline" className="gap-1 font-normal">
            <Clock className="h-3 w-3" />
            {job.type}
          </Badge>

          {job.experience && (
            <Badge variant="outline" className="font-normal">
              {job.experience}
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {job.description}
        </p>

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {job.skills.slice(0, 3).map((s) => (
              <Badge key={s} variant="secondary" className="text-xs">
                {s}
              </Badge>
            ))}

            {job.skills.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{job.skills.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-5 flex items-center justify-between gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
            <Bookmark className="h-4 w-4" />
          </Button>

          <Link to={`/jobs/${job._id}`} className="flex-1 sm:flex-none">
            <Button size="sm" className="w-full sm:w-auto">
              Apply
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</motion.div>
);

export default JobCard;
