import type { PublishingFallbackUsage } from '@/data/publishing/types';

export interface PublishingWarning {
  slug: string;
  message: string;
  fallbackUsage: PublishingFallbackUsage;
}

export class PublishingWarningCollector {
  private warnings: PublishingWarning[] = [];

  add(slug: string, message: string, fallbackUsage: PublishingFallbackUsage) {
    this.warnings.push({ slug, message, fallbackUsage });
  }

  all() {
    return [...this.warnings];
  }

  groupedBySlug() {
    return this.warnings.reduce<Record<string, PublishingWarning[]>>((groups, warning) => {
      groups[warning.slug] = groups[warning.slug] ?? [];
      groups[warning.slug].push(warning);
      return groups;
    }, {});
  }

  toSummaryLines() {
    return Object.entries(this.groupedBySlug()).flatMap(([slug, warnings]) => [
      `${slug}: ${warnings.length} publishing fallback warning${warnings.length === 1 ? '' : 's'}`,
      ...warnings.map((warning) => {
        const usage = warning.fallbackUsage;
        return `  - ${warning.message} -> ${usage.fallback} (${usage.surface})`;
      }),
    ]);
  }
}
